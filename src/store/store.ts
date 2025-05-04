import { create } from 'zustand';
import { CampaignFormStore, createCampaignFormSlice } from './campaign-slice';

export const useCampaignFormStore = create<CampaignFormStore>()((...a) => ({
    ...createCampaignFormSlice(...a),
}));
