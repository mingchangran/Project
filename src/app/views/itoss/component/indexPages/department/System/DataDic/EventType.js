import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, link, IndexRoute, History} from 'react-router';
function editPic() {
    return '<a class="EditEventType" href="javascript:void(0)" title="编辑"><img src="img/images/系统-1用户管理_08.png"/></a>';
}
function deletePic() {
    return '<a class="DelEventType" href="javascript:void(0)" title="删除"><img src="img/images/系统-1用户管理_03.png"/></a>';
}
window.eventTypeMagTableEvent = {
    'click .EditEventType':function(e, value, row, index){
         //曹志强		20161220	权限控制代码	start
    	var canDelete = _this.props.canDelete;
	    if(canDelete == 1){
	      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
	      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
	      $('#publicMessageModal').modal('show');
	      return false;
	    };
    	//曹志强		20161220	权限控制代码	end
    	
        $("#editEventTypeModal").modal("show");
        var id = row.RecId;
        _this.props.setEventCategoryId(id);
        $("#eventCategoryNameEditInput").val(row.Name);
        $("#eventCategoryDescEditInput").val(row.EventCategoryDesc);
    },
    'click .DelEventType':function(e, value, row, index){
    	//曹志强		20161220	权限控制代码	start
    	var canDelete = _this.props.canDelete;
	    if(canDelete == 1){
	      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
	      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
	      $('#publicMessageModal').modal('show');
	      return false;
	    };
    	//曹志强		20161220	权限控制代码	end
    	
		$("#deleteEventTypeModal").modal("show");
        var id = row.RecId;
        _this.props.setEventCategoryId(id);
    }
};
var _this;
var refreshBtnObj, deleteBtnObj, addBtnObj, titleBoxObj;
var EventType = React.createClass({
        getInitialState: function () {
        _this = this;
        return {
            isOk: 1
        }
    },
    componentDidUpdate:function(){
      var bdata = this.props.eventCategoryData;
      $("#eventTypeTableList").bootstrapTable("load",bdata);
    },
    componentDidMount: function () {
        $("#eventTypeTableList").bootstrapTable({

            columns: [
	                  {
			            title: '事件类型名称',
			            field: 'Name',
			            halign: 'left',
			            align: 'left',
			            sortable: true
			          },{
		                title: '事件类型描述',
		                field: 'EventCategoryDesc',
		                halign: 'left',
		                align: 'left',
		                sortable: true
		              },{
			            title: '编辑',
			            halign: 'left',
			            align: 'left',
			            events: eventTypeMagTableEvent,
			            formatter: editPic
			          },{
			            title: '删除',
			            halign: 'left',
			            align: 'left',
			            events: eventTypeMagTableEvent,
			            formatter: deletePic
			          }
            ],
            data: [],
            // onClickRow: this._onClickRow,
            exportDataType: "all"
        });
        titleBoxObj =document.createElement("div");
        let titleBoxObjA = document.createElement("a");
        let titleBoxObjW = document.createElement("span");
        titleBoxObjW.innerHTML = "事件类型管理";
        titleBoxObj.appendChild(titleBoxObjA);
        // console.log(titleBoxObj.appendChild(titleBoxObjA));
        titleBoxObj.setAttribute("class","pull-left");
        // titleBoxObj.innerHTML = "父区域管理";
            // var _this = this;
            refreshBtnObj = document.createElement('button');
        refreshBtnObj.setAttribute('class', 'btn btn-refresh');
        refreshBtnObj.setAttribute('type', 'button');
        refreshBtnObj.setAttribute('name', 'refresh');
        refreshBtnObj.setAttribute('title', '刷新');
        refreshBtnObj.innerHTML = "刷新";
        refreshBtnObj.onclick = function () {
            _this.props.get_eventCategoryData();
        };
        // refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';

        addBtnObj = document.createElement('button');
        addBtnObj.setAttribute('class', 'btn btn-success');
        addBtnObj.setAttribute('type', 'button');
        addBtnObj.setAttribute('name', 'add');
        addBtnObj.setAttribute('title', '添加事件类型');
        addBtnObj.innerHTML = "添加事件类型";
        addBtnObj.onclick = function () {
            /*----新建用户--*/
            $("#addEventTypeModal").modal("show")
        };
        // addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';
        var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        btnGroup.appendChild(refreshBtnObj, btnGroup.childNodes[0]);
        btnGroup.appendChild(addBtnObj, btnGroup.childNodes[0]);
        var btnGroup1 = document.getElementsByClassName('fixed-table-toolbar')[0];
			btnGroup1.appendChild(titleBoxObj,btnGroup1);
        $(".form-control").css({"display": "inline-block", "width": "243px"});
        $("#eventTypeTableList thead>tr").css({"background": "#d8e1e5"});
        $(".pull-left").css({"font-size":"16px","margin":"10px 0"});
        $(".pull-left").append(titleBoxObjA);
        $(".pull-left").append(titleBoxObjW);
        $(".pull-left>span").css({"margin-left":"10px","margin-top":"6px","float":"left"});
        $(".pull-left>a").css({"width":"3px","height":"16px","background":"#8eddf2","display":"block","float":"left","margin-top":"10px"});
    	$(".btn").css({"margin-bottom":"4px"});
    	$(".fixed-table-toolbar").css({"padding-top":"4px"});
    	$(".btn-refresh").css({"background":"#d8e1e5"});	
    },
    saveEventType:function(){
    	var eventCategoryNameAddInput = $("#eventCategoryNameAddInput").val();
    	var eventCategoryDescAddInput = $("#eventCategoryDescAddInput").val();
    	if(eventCategoryNameAddInput == null || eventCategoryNameAddInput == ""){
    		  $("#addEventTypeModal").modal("hide");
			  document.getElementById('publicMessageModelTitle').innerHTML = "提示"
		      document.getElementById('publicMessageModalcontent').innerHTML = "请填写事件类型名称"
		      $('#publicMessageModal').modal('show');
		      return false;
    	}else if(eventCategoryDescAddInput == null || eventCategoryDescAddInput == ""){
    		  $("#addEventTypeModal").modal("hide");
			  document.getElementById('publicMessageModelTitle').innerHTML = "提示"
		      document.getElementById('publicMessageModalcontent').innerHTML = "请填写事件类型描述"
		      $('#publicMessageModal').modal('show');
		      return false;
    	}else{
    		this.props.onClickSave(7);
        	$("#addEventTypeModal").modal("hide");
    	}
    },
    editEventType:function(){
    	var eventCategoryNameEditInput = $("#eventCategoryNameEditInput").val();
    	var eventCategoryDescEditInput = $("#eventCategoryDescEditInput").val();
    	if(eventCategoryNameEditInput == null || eventCategoryNameEditInput == ""){
    		  $("#editEventTypeModal").modal("hide");
			  document.getElementById('publicMessageModelTitle').innerHTML = "提示"
		      document.getElementById('publicMessageModalcontent').innerHTML = "请填写事件类型名称"
		      $('#publicMessageModal').modal('show');
		      return false;
    	}else if(eventCategoryDescEditInput == null || eventCategoryDescEditInput == ""){
    		$("#editEventTypeModal").modal("hide");
			  document.getElementById('publicMessageModelTitle').innerHTML = "提示"
		      document.getElementById('publicMessageModalcontent').innerHTML = "请填写事件类型描述"
		      $('#publicMessageModal').modal('show');
		      return false;
    	}else{
    		this.props.onClickEdit(7);
        	$("#editEventTypeModal").modal("hide");
    	}
    },
    deleteEventType:function () {
        this.props.delete_areaData(7);
        $("#deleteEventTypeModal").modal("hide");
    },
    render: function () {
        return (
            <div className='eventTypeMag'>
                {/*添加事件类型------------------------------------模态弹窗*/}
                <div className="modal fade" id="addEventTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header" style={{"background":"#64c4dd"}}>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                <h4 className="modal-title" id="myModalLabel">添加事件类型</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{"width":"444px"}}>
                                    <form className="form-horizontal" role="form">
                                    <div className="form-group" style={{"position":"relative"}}>
                                        <label for="eventTypeInput" className="col-sm-5 control-label">事件类型名称</label>
                                        <b style={{"color":"red","display":"inline-block","margin-left":"-240px","margin-top":"10px"}}>*</b>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="eventCategoryNameAddInput" name="eventCategoryNameAddInput" placeholder="事件类型名称"/>
                                        </div>
                                        <p id="eventTypeModalContent" style={{"position":"absolute","left":"358px","color":"red"}}></p>
                                    </div>
                                    <div className="form-group">
                                    	<label for="areaDescInput" className="col-sm-5 control-label">描述</label>
                                    	<b style={{"color":"red","display":"inline-block","margin-left":"-240px","margin-top":"10px"}}>*</b>
	                                    <div className=" col-sm-6">
	                                        <textarea className="form-control" id="eventCategoryDescAddInput" name="eventCategoryDescAddInput" placeholder="事件类型描述" style={{"height":"100px"}}></textarea>
	                                    </div>
                                	</div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={this.saveEventType}>保存</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*编辑事件类型------------------------------------模态弹窗*/}
                <div className="modal fade" id="editEventTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header" style={{"background":"#64c4dd"}}>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                <h4 className="modal-title" id="myModalLabel">编辑事件类型</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{"width":"444px"}}>
                                    <form className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <label for="editEventTypeInput" className="col-sm-5 control-label">事件类型名称</label>
                                            <b style={{"color":"red","display":"inline-block","margin-left":"-240px","margin-top":"10px"}}>*</b>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" id="eventCategoryNameEditInput" name="eventCategoryNameEditInput" placeholder="事件类型名称"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
	                                    	<label for="areaDescInput" className="col-sm-5 control-label">描述</label>
	                                    	<b style={{"color":"red","display":"inline-block","margin-left":"-240px","margin-top":"10px"}}>*</b>
		                                    <div className=" col-sm-6">
		                                        <textarea className="form-control" id="eventCategoryDescEditInput" name="eventCategoryDescEditInput" placeholder="描述" style={{"height":"100px"}}></textarea>
		                                    </div>
                                		</div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={this.editEventType}>保存</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*删除事件类型------------------------------------模态弹窗*/}
                <div className="modal fade" id="deleteEventTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{"width":"340px","margin":"auto"}}>
                            <div className="modal-header" style={{"background":"#64c4dd"}}>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                <h4 className="modal-title" id="myModalLabel">删除事件类型</h4>
                            </div>
                            <div className="modal-body">
                                您确定要删除此事件类型吗？
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={this.deleteEventType}>确定</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*区域列表*/}
                <div className="col-md-12">
                    <table id="eventTypeTableList"
                           data-toggle='table'
                           data-search='true'
                           data-classes='table table-no-bordered table-hover'
                           data-show-export="true"
                           data-show-refresh='false'
                           data-show-toggle='true'
                           data-show-columns='true'
                           data-pagination='true'
                           data-page-size='10'
                           data-resizable='true'>
                    </table>
                </div>
            </div>
        )
    }
});
export default EventType