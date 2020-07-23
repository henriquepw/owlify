import React, { createContext, useContext } from 'react';

import { Gateway, Endnode } from '@utils/interfaces';

import useGet from './get';

interface Devices {
  gateways: Gateway[];
  endnodes: Endnode[];
  isGatewaysLoading: boolean;
  isEndnodesLoading: boolean;
}

const DevicesContext = createContext<Devices>({} as Devices);

const DevicesProvider: React.FC = ({ children }) => {
  const [gateways = [], isGatewaysLoading] = useGet<Gateway[]>('/gateways');
  const [endnodes = [], isEndnodesLoading] = useGet<Endnode[]>('/endnodes');

  return (
    <DevicesContext.Provider
      value={{ gateways, endnodes, isGatewaysLoading, isEndnodesLoading }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

function useDevices(): Devices {
  const context = useContext(DevicesContext);

  return context;
}

export { DevicesProvider, useDevices };
