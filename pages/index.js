import axios from 'axios';
import Link from 'next/link';
import { Fragment, useEffect, useState, useContext } from 'react';

import {
  CheckCircleIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  LightningBoltIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import { ChannelMapContext } from '../context/ChannelContext';
import MainChart from './components/MainChart';

import mockEventData from '../mocks/eventData';

const statusStyles = {
  success: 'bg-blue-100 text-blue-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setChannelMap, channelMap, setCurrentChannelId } =
    useContext(ChannelMapContext);

  const [formattedEventData, setFormattedEventData] = useState({});

  useEffect(async () => {
    const getChannelEvents = async () => {
      if (Object.keys(channelMap).length > 0) {
        const { data } = await axios.get(
          `https://cloud.lnpay.co/v1/node/lnod_9u9znyub4ncouu3wic/events/htlcsummary?access-token=sak_A4dBYVGcj9QEonwK4fg7VdYssZ6WXtxB&period=minute`
        );
        setFormattedEventData(data);
      }
    };

    getChannelEvents();
  }, [channelMap]);

  useEffect(() => {
    const getChannels = async () => {
      const { data: channels } = await axios.get(
        'https://cloud.lnpay.co/v1/node/lnod_9u9znyub4ncouu3wic/lncli/listchannels?access-token=sak_A4dBYVGcj9QEonwK4fg7VdYssZ6WXtxB'
      );
      console.log('channels: ', channels);
      const map = {};
      for (let i = 0; i < channels.length; i++) {
        map[channels[i].chanId] = {
          ...channels[i],
          events: [],
        };
      }
      setChannelMap(map);
    };
    getChannels();
  }, []);

  return (
    <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src="https://lily-wallet.com/screenshots/kevin-small.jpeg"
                  alt=""
                />
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src="https://lily-wallet.com/screenshots/kevin-small.jpeg"
                      alt=""
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Good morning, KayBeSee
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Company</dt>
                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                      <OfficeBuildingIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Lily Technologies, Inc.
                    </dd>
                    <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400"
                        aria-hidden="true"
                      />
                      Verified shady super coder
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open Channel
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send BTC
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <MainChart eventData={formattedEventData} />

        <h2 className="max-w-6xl mx-auto mt-8 px-4 pb-4 pt-8 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Channel overview
        </h2>

        {/* Activity list (smallest breakpoint only) */}
        <div className="shadow sm:hidden">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            {Object.values(channelMap).map((channel) => (
              <li key={channel.id}>
                <Link
                  href={{
                    pathname: '/channel/[id]',
                    query: { id: channel.chanId },
                  }}
                >
                  <a className="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span className="flex items-center space-x-4">
                      <span className="flex-1 flex space-x-2 truncate">
                        <LightningBoltIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="flex flex-col text-gray-500 text-sm truncate">
                          <span className="truncate">
                            {channel.nodeInfo.node.alias}
                          </span>
                          <span>
                            <span className="text-gray-900 font-medium">
                              {channel.amount}
                            </span>{' '}
                            {channel.currency}
                          </span>
                          <time dateTime={channel.datetime}>
                            {channel.date}
                          </time>
                        </span>
                      </span>
                      <ChevronRightIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <nav
            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
          >
            <div className="flex-1 flex justify-between">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Previous
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Next
              </a>
            </div>
          </nav>
        </div>

        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Channel
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.values(channelMap).map((channel) => (
                      <tr key={channel.chanId} className="bg-white">
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <Link
                              href={{
                                pathname: '/channel/[id]',
                                query: { id: channel.chanId },
                              }}
                            >
                              <a className="group inline-flex space-x-2 truncate text-sm">
                                <LightningBoltIcon
                                  className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <p className="text-gray-500 truncate group-hover:text-gray-900">
                                  {channel.nodeInfo.node.alias}
                                </p>
                              </a>
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            {channel.capacity}{' '}
                          </span>
                          Sats
                        </td>
                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            className={classNames(
                              statusStyles[channel.active],
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                            )}
                          >
                            {channel.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <time dateTime={channel.uptime}>
                            {`${moment
                              .utc(channel.lifetime * 1000)
                              .format('H')} days`}
                          </time>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{' '}
                      <span className="font-medium">
                        {Object.keys(channelMap).length}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium">
                        {Object.keys(channelMap).length}
                      </span>{' '}
                      results
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
