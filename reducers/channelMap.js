export const CHANNELMAP_UPDATE = 'CHANNELMAP_UPDATE';
export const CHANNELMAP_SET = 'CHANNELMAP_SET';

export const channelMapReducer = (state, action) => {
  if (action.type === CHANNELMAP_UPDATE) {
    return {
      ...state,
      [action.payload.channel.chanId]: {
        ...action.payload.channel,
      },
    };
  }

  if (action.type === CHANNELMAP_SET) {
    return {
      ...action.payload,
    };
  }

  return state;
};
