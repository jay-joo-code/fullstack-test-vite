import express from 'express';
import uuid from 'uuid/v1';
import dynamoose from 'dynamoose';
import AWS from 'aws-sdk';
import config from '../config';
import { Locations } from './location';

const router = express.Router();

AWS.config.update(config);
const docClient = new AWS.DynamoDB.DocumentClient();

type Key = {
  id: string
};

type RiderType = {
  id: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  accessibilityNeeds: {
    needsWheelchair: boolean,
    hasCrutches: boolean,
    needsAssistant: boolean,
  },
  description: string,
  joinDate: string,
  pronouns: string,
  address: string,
  favoriteLocations: string[]
};

const schema = new dynamoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  accessibilityNeeds: {
    type: Object,
    schema: {
      needsWheelchair: Boolean,
      hasCrutches: Boolean,
      needsAssistant: Boolean,
    },
  },
  description: String,
  joinDate: String,
  pronouns: String,
  address: String,
  favoriteLocations: {
    type: Array,
    schema: [{ type: String }],
  },
  requestedRides: {
    type: Array,
    schema: [{
      type: Object,
      schema: Object({ id: String, startTime: String }),
    }],
  },
});

export const Riders = dynamoose.model('Riders', schema, { create: false });

// Get a rider by ID in Riders table
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Riders.get(id, (err, data) => {
    if (err) {
      res.send(err);
    } else if (!data) {
      res.send({ err: { message: 'id not found' } });
    } else {
      res.send(data);
    }
  });
});

// Get all riders
router.get('/', (req, res) => {
  Riders.scan().exec((err, data) => {
    if (err) {
      res.send(err);
    } else if (!data) {
      res.send({ err: { message: 'items not found' } });
    } else {
      res.send(data);
    }
  });
});

// Get all upcoming rides for a rider
router.get('/:id/rides', (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: 'Riders',
    Key: { id },
  };
  docClient.get(params, (err, data) => {
    if (err) {
      res.send({ err });
    } else if (!data.Item) {
      res.send({ err: { message: 'id not found' } });
    } else {
      const { requestedRides } = data.Item;
      if (!requestedRides.length) {
        res.send({ data: [] });
      } else {
        const rideParams = {
          RequestItems: {
            ActiveRides: {
              Keys: requestedRides,
            },
          },
        };
        docClient.batchGet(rideParams, (rideErr, rideData) => {
          if (rideErr) {
            res.send({ err: rideErr });
          } else {
            res.send({ data: rideData.Responses!.ActiveRides });
          }
        });
      }
    }
  });
});

// Get profile information for a rider
router.get('/:id/profile', (req, res) => {
  const { id } = req.params;
  Riders.get(id, (err, data: any) => {
    if (err) {
      res.send({ err });
    } else if (!data) {
      res.send({ err: { message: 'id not found' } });
    } else {
      const rider: RiderType = data;
      const {
        email, firstName, lastName, phoneNumber, pronouns, joinDate,
      } = rider;
      res.send({
        email, firstName, lastName, phoneNumber, pronouns, joinDate,
      });
    }
  });
});

// Get accessibility information for a rider
router.get('/:id/accessibility', (req, res) => {
  const { id } = req.params;
  Riders.get(id, (err, data: any) => {
    if (err) {
      res.send({ err });
    } else if (!data) {
      res.send({ err: { message: 'id not found' } });
    } else {
      const rider: RiderType = data;
      const { description, accessibilityNeeds } = rider;
      res.send({ description, accessibilityNeeds });
    }
  });
});

// Get all favorite locations for a rider
router.get('/:id/favorites', (req, res) => {
  const { id } = req.params;
  Riders.get(id, (err, data: any) => {
    if (err) {
      res.send({ err });
    } else if (!data) {
      res.send({ err: { message: 'id not found' } });
    } else {
      const rider: RiderType = data;
      const { favoriteLocations } = rider;
      const keys: Key[] = favoriteLocations.map((locID: string) => ({
        id: locID,
      }));
      if (!keys.length) {
        res.send({ data: [] });
      } else {
        Locations.batchGet(keys, (locErr, locData) => {
          if (locErr) {
            res.send({ err: locErr });
          } else {
            res.send({ data: locData });
          }
        });
      }
    }
  });
});

// Create a rider in Riders table
router.post('/', (req, res) => {
  const postBody = req.body;
  const rider = new Riders({
    id: uuid(),
    ...postBody,
    favoriteLocations: [],
    requestedRides: [],
  });
  rider.save((err, data) => {
    if (err) {
      res.send({ err });
    } else {
      res.send(data);
    }
  });
});

// Update a rider in Riders table
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const postBody = req.body;
  Riders.update({ id }, postBody, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Add a location to favorites
router.post('/:id/favorites', (req, res) => {
  const { id } = req.params;
  const postBody = req.body;
  const locID = postBody.id;
  Locations.get(locID, (err, data) => {
    if (err) {
      res.send({ err });
    } else if (!data) {
      res.send({ err: { message: 'location not found' } });
    } else {
      const location = data;
      Riders.update({ id }, { $ADD: { favoriteLocations: [locID] } }, (riderErr) => {
        if (riderErr) {
          res.send({ err: riderErr });
        } else {
          res.send(location);
        }
      });
    }
  });
});

// Delete an existing rider
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Riders.get(id, (err, data) => {
    if (err) {
      res.send({ err });
    } else if (!data) {
      res.send({ err: { message: 'id not found' } });
    } else {
      data.delete().then(() => res.send({ id }));
    }
  });
});

export default router;
