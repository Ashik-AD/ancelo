import Chart from 'react-apexcharts';
import { Card, CardTitle } from '../card';
import useFetch from 'renderer/hooks/useFetch';

import type { ApexOptions } from 'apexcharts';

const options: ApexOptions = {
  chart: {
    type: 'bar',
    stacked: true,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    width: '100%',
    height: '100%',
    redrawOnParentResize: true,

    foreColor: '#858585',
  },

  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      borderRadius: 16,
      columnWidth: '60%',
      rangeBarGroupRows: true,
      borderRadiusWhenStacked: 'all',
    },
  },

  grid: { show: false },
  yaxis: {
    show: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        fontWeight: 500,
        fontSize: '14px',
      },
    },
  },
  legend: {
    show: false,
  },
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'],
  stroke: {
    show: false,
  },
  colors: ['#8A60E2', '#8A60E278'],
};
export default function WeeklyTaskStatus() {
  const { data, isLoading, error } = useFetch('/stat/weekly');
  return (
    <Card>
      <CardTitle title="Weekly Task" />
      <Chart
        type="bar"
        options={options}
        width={'100%'}
        height={'100%'}
        series={[
          {
            name: 'Completed',
            data: data?.completed,
          },
          {
            name: 'Uncompleted',
            data: data?.unCompleted,
          },
        ]}
      />
    </Card>
  );
}
