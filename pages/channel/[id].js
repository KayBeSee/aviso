import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';

import { useState, useEffect, useContext } from 'react';
import {
  ChevronLeftIcon,
  XCircleIcon,
  ScaleIcon,
} from '@heroicons/react/solid';

import Modal from '../components/Modal';
import CloseChannelModal from '../components/CloseChannelModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

import ChannelsLayout from './ChannelsLayout';
import { ChannelMapContext } from '../../context/ChannelContext';
import axios from 'axios';
import RebalanceChannelModal from '../components/RebalanceChannelModal';

export default function ChannelsView({ channel }) {
  const router = useRouter();
  const { setCurrentChannelId, currentChannel, updateChannelMap } =
    useContext(ChannelMapContext);
  const [currentTab, setCurrentTab] = useState('Overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<CloseChannelModal />);

  useEffect(() => {
    setCurrentChannelId(router.query.id);
  }, [router.query.id]);

  useEffect(() => {
    if (!currentChannel.events.length && currentChannel.id) {
      const getChannelEvents = async () => {
        const { data } = await axios.get(
          `https://cloud.lnpay.co/v1/node/lnod_9u9znyub4ncouu3wic/events/htlc?access-token=sak_A4dBYVGcj9QEonwK4fg7VdYssZ6WXtxB&eventType=SEND&outgoingChannelId=${router.query.id}`
        );

        const updatedChannel = { ...currentChannel, events: data };
        updateChannelMap(updatedChannel);
      };
      getChannelEvents();
    }
  }, [router.query.id]);

  const openRebalanceModal = () => {
    setModalOpen(true);
    setModalContent(<RebalanceChannelModal setModalOpen={setModalOpen} />);
  };

  const openCloseChannelModal = () => {
    setModalOpen(true);
    setModalContent(<CloseChannelModal setModalOpen={setModalOpen} />);
  };

  const tabs = [
    { name: 'Overview', href: '#', current: currentTab === 'Overview' },
    { name: 'Payments', href: '#', current: currentTab === 'Payments' },
    { name: 'Events', href: '#', current: currentTab === 'Events' },
  ];

  const metadata = {
    ['Local Balance']: currentChannel.localBalance | 0,
    ['Remote Balance']: currentChannel.remoteBalance | 0,
    ['Sats Sent']: currentChannel.totalSatoshisSent,
    ['Sats Received']: currentChannel.totalSatoshisReceived,
    ['Channel Age']: `${moment
      .utc(currentChannel.lifetime * 1000)
      .format('HH')} days`,
    ['Channel Uptime']: `${(
      (currentChannel.uptime / currentChannel.lifetime) *
      100
    )
      .toString()
      .substring(0, 2)}%`,
  };
  console.log('currentChannel: ', currentChannel);
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        {/* Breadcrumb */}
        <nav
          className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
          aria-label="Breadcrumb"
        >
          <a
            href="#"
            className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <ChevronLeftIcon
              className="-ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Directory</span>
          </a>
        </nav>
        <article>
          {/* Profile header */}
          <div>
            <div>
              <div
                className="h-32 w-full object-cover lg:h-48"
                style={{
                  backgroundColor: '#3182ce',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23f59e0b' fill-opacity='0.58' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
                alt=""
              />
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <div
                    className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                    style={{
                      backgroundColor: currentChannel.nodeInfo.node.color,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23f59e0b' fill-opacity='0.58' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    }}
                    alt=""
                  />
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {currentChannel.nodeInfo.node.alias}
                    </h1>
                    <p className="text-sm font-medium text-gray-500">
                      {currentChannel.active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      onClick={() => openRebalanceModal()}
                    >
                      <ScaleIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Rebalance</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      onClick={() => openCloseChannelModal()}
                    >
                      <XCircleIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Close Channel</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {currentChannel.nodeInfo.node.alias}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  {currentChannel.active ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      onClick={() => setCurrentTab(tab.name)}
                      className={classNames(
                        tab.current
                          ? 'border-yellow-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Description list */}
          <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {Object.keys(metadata).map((field) => (
                <div key={field} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{field}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {metadata[field]}
                  </dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd
                  className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                  dangerouslySetInnerHTML={{
                    __html: `<p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
                <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>`,
                  }}
                />
              </div>
            </dl>
          </div>
        </article>
      </main>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalContent}
      </Modal>
    </div>
  );
}

ChannelsView.getLayout = function getLayout(page) {
  return <ChannelsLayout>{page}</ChannelsLayout>;
};
