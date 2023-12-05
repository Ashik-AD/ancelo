import Chart from 'react-apexcharts';
import { Card, CardTitle } from '../card';
import { ApexOptions } from 'apexcharts';
import useFetch from 'renderer/hooks/useFetch';

const options: ApexOptions = {
  chart: {
    type: 'bar',
    stacked: true,
    zoom: {
      enabled: false,
    },
    width: '100%',
    redrawOnParentResize: true,
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      borderRadius: 24,
      columnWidth: '50%',
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
  },
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'],
  stroke: {
    show: false,
    width: 8,
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
