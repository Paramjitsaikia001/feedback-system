import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import DashboardNavber from "../../utils/dashboard-navber";
import Left_Navbar from "../../utils/left-navber";

const FeedbackAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/feedback/statistics", { withCredentials: true })
      .then(res => setStats(res.data))
      .catch(err => console.error("❌ Error fetching stats:", err));
  }, []);
console.log(stats);

  if (!stats) return <p className="text-center mt-10">Loading analytics...</p>;

  // Pie chart – Rating distribution
  const pieData = {
    labels: stats.ratingDistribution.map(r => `Rating ${r._id}`),
    datasets: [
      {
        data: stats.ratingDistribution.map(r => r.count),
        backgroundColor: ["#1E88E5", "#43A047", "#FDD835", "#FB8C00", "#E53935"],
        borderColor: "#FFFFFF",
        borderWidth: 2
      }
    ]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

// Debugging log to check backend values
console.log("Per Question Stats:", stats.perQuestion);

// Bar chart – Average per question
const barData = {
  labels: stats.perQuestion.map(q =>
    q.questionText?.length > 30
      ? q.questionText.slice(0, 30) + "..."
      : q.questionText
  ),
  datasets: [
    {
      label: "Average Rating",
      data: stats.perQuestion.map(q => {
        const rating = Number(q.avgRating ?? 0); // default to 0 if null
        return isNaN(rating) ? 0 : rating; // avoid NaN values
      }),
      backgroundColor: "#42A5F5",
      borderRadius: 5 // Rounded bars
    }
  ]
};

const barOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `Average: ${context.parsed.x.toFixed(2)}`
      }
    }
  },
  scales: {
    x: {
      min: 0,
      max: 5,
      ticks: { stepSize: 1 }
    },
    y: {
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0
      }
    }
  }
};

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <DashboardNavber />
      <div className="maincontent flex w-full">
        <Left_Navbar />
        <div className="w-[80%]">
          <h1 className="text-2xl border-b-1 border-[#8b8b8b] py-4 px-4">
            Feedback Analysis
          </h1>

          {/* Overall Stats */}
          <div className="overallstatics h-[40%] flex mt-5">
            <div className="pieChart border border-[#8b8b8b] m-4 rounded-2xl w-1/2 shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">Rating Distribution</h2>
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="barChart border border-[#8b8b8b] m-4 rounded-2xl w-1/2 shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">Average per Question</h2>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Per Question Ratings List */}
          <div className="border border-[#8b8b8b] m-4 rounded-2xl p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Per Question Average Ratings</h2>
            {stats.perQuestion.map((q, index) => (
              <div
                key={index}
                className="mb-3 p-3 border-b border-gray-300 last:border-b-0"
              >
                <p className="font-medium">
                  Q{index + 1}: {q.questionText}
                </p>
              <p className="text-yellow-500">
  {"⭐".repeat(Math.round(Number(q.avgRating) || 0))}{" "}
  <span className="text-gray-600">
    ({Number(q.avgRating || 0).toFixed(2)})
  </span>
</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackAnalytics;