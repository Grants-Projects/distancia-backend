import mongoose, { Schema, model } from 'mongoose';
import { AdsStatus, MediaType } from '../constants/status.const';
import { IAds } from '../interfaces/Model/IAds';

const AdsSchema = new Schema<IAds>(
  {
    ownerId: {
      type: String,
      required: true,
    },
    mediaLink: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: Object.values(MediaType),
      default: MediaType.MP4,
    },
    interestId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(AdsStatus),
      default: AdsStatus.ACTIVE,
    },
    thumbnail: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: function (doc: any, ret: any) {
        delete ret._id;
        ret.id = doc._id;
      },
    },
  }
);

// Export Ads model
const Ads = model<IAds>('Ads', AdsSchema);

export default Ads;
