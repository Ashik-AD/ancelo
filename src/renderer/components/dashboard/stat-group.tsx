import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import useFetch from 'renderer/hooks/useFetch';
import { Card } from '../card';
import images from '../images';

import style from './stat.module.scss';
const legendColors = ['#10B981', '#DB937A', '#28BDB0', '#9F28BD'];
const options: ApexOptions = {
  chart: {
    type: 'radialBar',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    parentHeightOffset: 0,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '30%',
      },
      track: {
        opacity: 0.3,
      },
    },
  },
  stroke: {
    lineCap: 'round',
  },
  labels: [
    'Completed Task',
    'Uncompleted Task',
    'Completion Percent',
    'Completion Probability',
  ],
  colors: legendColors,
};
export default function StatGroup() {
  const { data, isLoading, error } = useFetch('/stat/count');
  if (isLoading || !data) return null;
  const { task, uncompletedTask } = data;
  const completedTask = task - uncompletedTask;
  const completionProbability = optDecimal(completedTask / task);
  const completionPercent = optDecimal((completedTask / task) * 100);
  return (
    <Card className={style.stat_chart_radial}>
      <Chart
        type="radialBar"
        options={options}
        height={'100%'}
        width={'100%'}
        series={[
          completedTask,
          uncompletedTask,
          completionPercent,
          completionProbability,
        ]}
      />
      <article className={style.stat_legends}>
        <div className={`${style.legend__item} ${style.legend__with_icon}`}>
          <img src={images.gym} />
          <span className={style.legend__label}>
            <small>Number of task</small>
            <strong>{data?.task}</strong>
          </span>
        </div>
        <hr />
        <div className={style.legend__group}>
          <LegendItem
            label="Completed Task"
            stat={completedTask}
            color={legendColors[0]}
          />
          <LegendItem
            label="Probability completion"
            stat={completionProbability}
            color={legendColors[1]}
          />
          <LegendItem
            label="Uncompleted Task"
            stat={data?.uncompletedTask}
            color={legendColors[2]}
          />
          <LegendItem
            label="Successful completion"
            stat={`${completionPercent}%`}
            color={legendColors[3]}
          />
        </div>
      </article>
    </Card>
  );
}

function LegendItem({
  label,
  color,
  stat,
}: {
  label: string;
  color: string;
  stat: string | number;
}) {
  return (
    <article className={style.legend__item}>
      <span
        className={style.legend__circle}
        style={{ background: color }}
      ></span>
      <span className={style.legend__label}>
        <small>{label}</small>
        <strong>{stat}</strong>
      </span>
    </article>
  );
}

function optDecimal(value: number) {
  return Number.isInteger(value) ? value : value.toFixed(2);
}
