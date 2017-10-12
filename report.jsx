var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

module.exports = createReactClass({
  render () {
    var dimensions=[
      {value:'host',title:'Host'},
      {value:'date',title:'Date'}
    ]
    var reduce=function(row,memo){
      if(row.type=='impression'){
        memo.impression=(memo.impression||0)+1;
      }
      if(row.type=='load'){
        memo.load=(memo.load||0)+1
      }
      if(row.type=='display'){
        memo.display=(memo.display||0)+1
      }
      return memo
    }
    var calculations=[
      {title:'Impressions', value:'impression',
      template: function(val, row) { return  val.toFixed(0) }},
      {title:'Load', value:'load',
      template: function(val, row) { return  val.toFixed(0) }},
      {title:'Display', value:'display',
      template: function(val, row) { return  val.toFixed(0) }},
      {title: 'Load Rate',
    value: function(memo) { return (memo.load*100) / memo.impression },
    template: function(val, row) { return val.toFixed(2) }},
    {title: 'Display Rate',
    value: function(memo) { return (memo.display*100) / memo.load },
    template: function(val, row) { return val.toFixed(1) }},
    ]
    return (
    <div>Report
      <div class="#table">
    <ReactPivot rows={rows}
              dimensions={dimensions}
              reduce={reduce}
              calculations={calculations} 
              sortBy={'Display Rate'}
              sortDir="desc"/>
              </div>
              </div>
  );
  }
})
