import Ember from 'ember';

export default Ember.Component.extend({

  chartOptions: {
    title: 'Spendings by category',
    backgroundColor: '#f5f5f5',
    height: 400
  },

  didInsertElement () {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.initiateChart();
    });
  },

  initiateChart () {
    const elId = this.$().attr('id');
    this.set('chart', new google.visualization.PieChart(document.getElementById(elId)));
    this.drawChart();
  },

  drawChart () {
    let data;
    if (this.get('data').length <= 1) {
      data = google.visualization.arrayToDataTable([
        ['Category', 'Spendings'],
        ['None', 1]
      ]);
    } else {
      data = google.visualization.arrayToDataTable(this.get('data'));
    }
    this.get('chart').draw(data, this.get('chartOptions'));
  },

  didUpdateAttrs () {
    this.drawChart();
  },

  didDestroyElement () {
    this.get('chart').clearChart();
  }

});
