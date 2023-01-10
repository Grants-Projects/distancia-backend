/** @format */

import { InterestStatus } from '../constants/status.const';
import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import Interest from '../models/interest';
import User from '../models/user-model.model';
import { BadRequest, ResourceNotFoundError } from '../exceptions/ErrorHandlers';
import { NotFound } from 'express-openapi-validator/dist/openapi.validator';

@injectable()
export class InterestService {
  public fetchInterests = async () => {
    const data = await Interest.find({});

    if (!data) {
      throw new ResourceNotFoundError('Interest already exists');
    }
    return data;
  };

  public addInterest = async (data: any) => {
    const findInterest = await Interest.findOne({ name: data.name });
    if (findInterest) {
      throw new BadRequest('Interest already exists');
    }
    let interest = new Interest({
      name: data.name,
      url: data.url,
      status: InterestStatus.ACTIVE,
    });

    interest = await interest.save();

    return interest;
  };

  public linkUserInterest = async (userId: string, userInterests: any[]) => {
    for (let userInterest of userInterests) {
      const findInterest = await Interest.findOne({ _id: userInterest });
      if (!findInterest) {
        throw new BadRequest(`${userInterest} is invalid`);
      }
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new ResourceNotFoundError('user does not exists');
    }

    user.interests.push(...userInterests);
    await user.save();
  };
}
