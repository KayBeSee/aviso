import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { useContext } from 'react';
import { ChannelMapContext } from '../../context/ChannelContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

import channels from '../../mocks/channels';

const ChannelRow = ({ channel }) => {
  const { currentChannel } = useContext(ChannelMapContext);

  return (
    <li key={channel.id}>
      <div
        className={classNames(
          channel.chanId === currentChannel.chanId
            ? 'bg-gray-900 text-white'
            : 'text-gray-400 hover:bg-gray-700',
          'relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500'
        )}
        className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500"
      >
        <div className="flex-shrink-0">
          <div
            className="h-10 w-10 rounded-full"
            style={{
              backgroundColor: channel.nodeInfo.node.color,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23f59e0b' fill-opacity='0.58' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={{
              pathname: '/channel/[id]',
              query: { id: channel.chanId },
            }}
          >
            <a className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">
                {channel.nodeInfo.node.alias}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Capacity: {channel.capacity} sats
              </p>
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default function ChannelsView({ children }) {
  const { channelMap } = useContext(ChannelMapContext);

  const channels = Object.values(channelMap);

  return (
    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
      <section
        aria-labelledby="primary-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
      >
        <h1 id="primary-heading" className="sr-only">
          Channels
        </h1>
        {children}
      </section>

      <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
        <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
          <nav
            className="flex-1 min-h-0 overflow-y-auto"
            aria-label="Directory"
          >
            <div className="relative">
              <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                <h3>Unhealthy Channels</h3>
              </div>
              <ul role="list" className="relative z-0 divide-y divide-gray-200">
                {channels.map((channel) => (
                  <ChannelRow channel={channel} />
                ))}
              </ul>

              <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                <h3>Healthy Channels</h3>
              </div>
              <ul role="list" className="relative z-0 divide-y divide-gray-200">
                {channels.map((channel) => (
                  <ChannelRow channel={channel} />
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </main>
  );
}
