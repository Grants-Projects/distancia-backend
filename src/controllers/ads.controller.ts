import { HandleErrorResponse } from '../exceptions/ErrorHandlers';
import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../interfaces/http.interface';
import { AdsService } from '../services/ads.service';
import { StatusCodes } from '../constants';

@injectable()
export default class AdsController {
  constructor(private adsService: AdsService) {}

  fetchAds = async (req: IRequest, res: IResponse) => {
    try {
      console.log(req.query);
      let interestId = req.query.id as String;
      let response = await this.adsService.fetchAds(interestId);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };

  createAd = async (req: IRequest, res: IResponse) => {
    try {
      let response = await this.adsService.createAd(req.body);
      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };

  fetchAdsNotWatched = async (req: IRequest, res: IResponse) => {
    try {
      console.log('here');
      let response = await this.adsService.fetchAdsNotWatched(
        req.params.interestId,
        req.params.userId
      );
      return res.status(StatusCodes.OK).json(response[0]);
    } catch (err) {
      return HandleErrorResponse(err, res);
    }
  };
}
