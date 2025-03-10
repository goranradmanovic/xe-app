export const useChartOptions = () => {
	const documentStyle = getComputedStyle(document.documentElement),
	  textColor = documentStyle.getPropertyValue('--p-text-color'),
	  textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color'),
	  surfaceBorder = documentStyle.getPropertyValue('border-transparent') // --p-content-border-color

	return {
	  maintainAspectRatio: false,
	  aspectRatio: 0.6,
	  plugins: {
	    legend: {
	      labels: {
	          color: textColor
	      }
	    }
	  },
	  scales: {
	    x: {
	      ticks: {
	          color: textColorSecondary
	      },
	      grid: {
	          color: surfaceBorder
	      }
	    },
	    y: {
	      ticks: {
			  callback: function (value) {
			  	return Math.abs(value) >= 1_000_000_000 ? value / 1000000000 : value
			  },
	          color: textColorSecondary
	      },
	      grid: {
	          color: surfaceBorder
	      }
	    }
	  }
	}
}