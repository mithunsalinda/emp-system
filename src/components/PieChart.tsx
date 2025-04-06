import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Employee {
  gender: string;
}

interface PieChartProps {
  data: Employee[];
}
const PieChart = ({ data }: PieChartProps) => {
  const genderCounts: Record<string, number> = data.reduce(
    (acc, employee) => {
      const gender = employee.gender?.toLowerCase() || 'unknown';
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(genderCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    y: value,
  }));

  const options = {
    chart: {
      type: 'pie',
      height: 180,
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Employees',
        colorByPoint: true,
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
