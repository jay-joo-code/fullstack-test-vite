import { Response } from 'express';
import { Model } from 'dynamoose/dist/Model';
import { Document } from 'dynamoose/dist/Document';
import { ObjectType } from 'dynamoose/dist/General';

type ClientType = Document & Model<Document>;

export const getByID = (
  (res: Response,
    client: ClientType,
    id: string,
    table: string,
    callback?: (value: any) => void) => {
    client.get(id, (err, data) => {
      if (err) {
        res.send(err);
      } else if (!data) {
        res.send({ err: { message: `id not found in ${table}` } });
      } else {
        if (callback) {
          callback(data);
        }
        res.send(data);
      }
    });
  }
);

export const getAll = (
  (res: Response, client: ClientType, table: string) => {
    client.scan().exec((err, data) => {
      if (err) {
        res.send(err);
      } else if (!data) {
        res.send({ err: { message: `items not found in ${table}` } });
      } else {
        res.send(data);
      }
    });
  }
);

export const create = (
  (res: Response, doc: Document) => {
    doc.save((err, data) => {
      if (err) {
        res.send({ err });
      } else {
        res.send(data);
      }
    });
  }
);

export const update = (
  (res: Response, client: ClientType, key: ObjectType, updateObj: ObjectType, table: string) => {
    client.update(key, updateObj, (err, data) => {
      if (err) {
        res.send(err);
      } else if (!data) {
        res.send({ err: { message: `id not found in ${table}` } });
      } else {
        res.send(data);
      }
    });
  }
);

export const deleteByID = (
  (res: Response, client: ClientType, id: string, table: string) => {
    client.get(id, (err, data) => {
      if (err) {
        res.send({ err });
      } else if (!data) {
        res.send({ err: { message: `id not found in ${table}` } });
      } else {
        data.delete().then(() => res.send({ id }));
      }
    });
  });
