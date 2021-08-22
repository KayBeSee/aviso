import React, { createContext, useReducer, useCallback, useState } from 'react';

import {
  channelMapReducer,
  CHANNELMAP_UPDATE,
  CHANNELMAP_SET,
} from '../reducers/channelMap';

export const ChannelMapContext = createContext({
  setChannelMap: (channelMap) => {},
  updateChannelMap: (channel) => {},
  setCurrentChannelId: (id) => {},
  channelMap: {},
  currentChannel: {},
});

export const ChannelMapProvider = ({ children }) => {
  const [channelMap, dispatch] = useReducer(channelMapReducer, {});
  const [currentChannelId, setCurrentChannelId] = useState('satoshi');

  const currentChannel = channelMap[currentChannelId] || {
    name: 'Loading...',
    events: [],
    nodeInfo: {
      node: {
        color: '$fffff',
      },
    },
  };

  const updateChannelMap = useCallback(
    (channel) => {
      dispatch({
        type: CHANNELMAP_UPDATE,
        payload: {
          channel,
        },
      });
    },
    [dispatch]
  );

  const setChannelMap = useCallback(
    (channelMap) => {
      dispatch({
        type: CHANNELMAP_SET,
        payload: channelMap,
      });
    },
    [dispatch]
  );

  const value = {
    channelMap,
    updateChannelMap,
    setChannelMap,
    currentChannel,
    setCurrentChannelId,
  };

  console.log('value: ', value);

  return (
    <ChannelMapContext.Provider value={value}>
      {children}
    </ChannelMapContext.Provider>
  );
};
