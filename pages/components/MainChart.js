import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  LineChart,
} from 'recharts';

import Spinner from './Spinner';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    console.log('label: ', label);
    return (
      <TooltipContainer>
        <PriceTooltip>{payload[0] && payload[0].value} events</PriceTooltip>
        <DateTooltip>{moment.unix(label).format('MMMM DD, YYYY')}</DateTooltip>
      </TooltipContainer>
    );
  }

  return null;
};

const colors = ['#3182ce', '#319795', '#667eea', '#805ad5', '#d53f8c'];

const MainChart = ({ eventData }) => {
  console.log('eventData: ', eventData);

  const oneMonthDomain = Object.keys(eventData).length - 31;
  const sixMonthDomain = Object.keys(eventData).length - 30 * 6;
  const oneYearDomain = Object.keys(eventData).length - 365;
  const allDomain = 0;

  const [currentDomain, setCurrentDomain] = useState(oneMonthDomain);
  const [animateChart, setAnimateChart] = useState(false);

  const changeDomain = (domain) => {
    setAnimateChart(true);
    setCurrentDomain(domain);
  };

  const getChartInterval = () => {
    if (currentDomain === allDomain) {
      return 465;
    } else if (currentDomain === oneMonthDomain) {
      return 3;
    } else if (currentDomain === sixMonthDomain) {
      return 21;
    } else if (currentDomain === oneYearDomain) {
      return 35;
    }
  };

  return (
    <ChartContainer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg shadow-md bg-white">
        <ChartInfo>
          <div className="flex flex-col text-md">
            {eventData.length && `${eventData.length} events`}
          </div>
          <div className="font-medium text-gray900 flex">
            <ChartControlItem
              active={currentDomain === oneMonthDomain}
              onClick={() => changeDomain(oneMonthDomain)}
            >
              1M
            </ChartControlItem>
            <ChartControlItem
              active={currentDomain === sixMonthDomain}
              onClick={() => changeDomain(sixMonthDomain)}
            >
              6M
            </ChartControlItem>
            <ChartControlItem
              active={currentDomain === oneYearDomain}
              onClick={() => changeDomain(oneYearDomain)}
            >
              1Y
            </ChartControlItem>
            <ChartControlItem
              active={currentDomain === 0}
              onClick={() => changeDomain(0)}
            >
              ALL
            </ChartControlItem>
          </div>
        </ChartInfo>
        <ResponsiveContainer width="100%" height={400}>
          {eventData.length ? ( // if the call to get historical price fails, then set loading or filler screen
            <LineChart width={400} height={400} data={eventData}>
              <YAxis hide={true} domain={['dataMin - 1  ', 'dataMax + 1']} />
              <XAxis
                dataKey="time"
                tickCount={6}
                interval={getChartInterval()} // TODO: adjust to accept 1yr, 1month, 1 week, need to use domain prop
                tickLine={false}
                tickFormatter={(date) => {
                  if (currentDomain === oneMonthDomain) {
                    return moment(date).format('MMM D');
                  } else if (currentDomain === sixMonthDomain) {
                    return moment(date).format('MMM D');
                  } else {
                    return moment(date).format('MMM YYYY');
                  }
                }}
              />
              <Line
                type="monotone"
                dataKey="756558557979148288"
                strokeWidth={2}
                isAnimationActive={animateChart}
                stroke={colors[0]}
              />
              <Line
                type="monotone"
                dataKey="743625002639294465"
                strokeWidth={2}
                isAnimationActive={animateChart}
                stroke={colors[1]}
              />
              <Line
                type="monotone"
                dataKey="746271527260127232"
                strokeWidth={2}
                isAnimationActive={animateChart}
                stroke={colors[2]}
              />
              <Tooltip
                offset={-100}
                cursor={false}
                allowEscapeViewBox={{ x: true, y: true }}
                wrapperStyle={{
                  marginLeft: -10,
                }}
                content={CustomTooltip}
              />
            </LineChart>
          ) : (
            <div className="flex align-center justify-center">
              <Spinner />
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

const ChartInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em 2em 0;
  align-items: center;
`;

const CurrentPriceText = styled.div`
  color: ${'#718096'};
  font-size: 0.5em;
`;

const ChartControlsContainer = styled.div`
  display: flex;
  font-weight: 500;
`;

const ChartControlItem = styled.div`
  color: ${(p) => (p.active ? '#2f855a' : '#a0aec0')};
  padding: 0.25em;
  cursor: pointer;
  margin: 0 0.25em;
`;

const CurrentBitcoinPriceContainer = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  padding: 0;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.385em;
`;

const TooltipContainer = styled.div`
  background: rgba(31, 31, 31, 0.75);
  padding: 1em;
  border-radius: 4px;
  text-align: center;
`;

const PriceTooltip = styled.div`
  color: #ffffff;
`;

const DateTooltip = styled.div`
  color: #a0aec0;
  font-size: 0.75em;
`;

export default MainChart;
