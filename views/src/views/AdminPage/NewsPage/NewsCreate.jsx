/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Label,
  Input
} from "reactstrap";
import { PanelHeader, MaterialInputText, MaterialSelect, Button } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { validateNumberBonus } from "../../../utils/validateNumberX";
import { actGetNewsByID, actUpdateNewsRequest, actCreateNewsRequest } from "../../../actions/news.action";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import PropTypes from "prop-types";
import { Editor } from '@tinymce/tinymce-react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import callApi from "utils/callApiCms";

class NewsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: new Date(),
      newscreate: [
        
        {
          name: "enterprise_id",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "title",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "avatar",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "description",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "content",
          value: "",
          error: false,
          errorMessage: ""
        }, 
        {
          name: "author",
          value: "",
          error: false,
          errorMessage: ""
        }
      ],
      data: [],
      file: "",
      fileUpload: "",
      isEdit: window.location.pathname.split("/admin-page/")[1] === "sua-news/" + this.props.match.params.news_id
    };
    this.handleFileOnChange = this.handleFileOnChange.bind(this)
  }


  componentDidMount() {
  	callApi('enterprise/list?limit=100','GET').then(res=>{
  		if(res.status === 200){
				const data = [...res.data.docs].map(e => ({label:e.name,value:e.enterprise_id}));
				this.setState({data});
  		}
  	})
    if (this.state.isEdit === true) {
      this.props.getListNewsID(this.props.match.params.news_id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isEdit === true) {
      if (nextProps.listNewsDetail && nextProps.listNewsDetail.data) {
        this.setNewsEdit(nextProps.listNewsDetail.data);
        this.setState({
          createdAt:nextProps.listNewsDetail.data.createdAt
        })
      }
    }
  }

  setNewsEdit = newsdetail => {
    const { newscreate } = this.state;
    newscreate.map(prop => {
      prop.value = newsdetail[prop.name];
      return null;
    });
  }

  handleOnChange = e => {
    const {newscreate,image} = this.state;

    newscreate.map(prop => {
      if (prop.name === e.target.name) {
        prop.value = e.target.value;
        prop.error = false;
        prop.errorMessage = "";
        return prop;
      }
      return prop;
    });
    this.setState({
      newscreate
    });
    
  }
  handleOnSelectChange = e =>{
  	const newscreate = this.state.newscreate;
  	newscreate[0].value = e.target.value;
  	this.setState({newscreate});
  }
  handleFileOnChange = e => {
    
    let img = new FormData();
    img.append("image",e.target.files[0])
    img.append("imgname","ten file anh");
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      fileUpload: img,
    })
  }
  validate = () => {
    const newscreate = this.state.newscreate;
    newscreate.map(prop => {
      if (prop.value === "" && prop.value === "."  ) {
        prop.error = true;
        prop.errorMessage = "Vui lòng điền thông tin.";
        this.setState({ newscreate });
      }
      return null;
    });
    const result = newscreate.filter(newscreate => newscreate.error === true);
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleOnSubmit = () => {
    var isValid = this.validate();
    


    const { newscreate,createdAt,fileUpload } = this.state;
    // console.log("fileUpload",fileUpload)
    if (isValid) {
      if (this.state.isEdit === true) {
        this.props.updateNewsRequest(
          this.props.match.params.news_id,
          ...newscreate.map(a => a.value),
          createdAt,
          fileUpload
        );
      } else {
        this.props.createNewsRequest(
          ...newscreate.map(a => a.value),
          createdAt,
          fileUpload
        );
      }

    }
  }
  _handleOnChangeDatestart = date => {
    // let convertD = formatStringToTime(date);
    this.setState({
      createdAt: new Date(date)
    });
  };
  render() {
    const { newscreate, isEdit, createdAt,file,data } = this.state;
    
    return (
      <div>
        {this.state.alert}
        <PanelHeader size="sm" />
        <div className="content ">
          <Row>
            <Col md="7" xs="12" className="m-auto">
              <Card className="card-staff card-form-staff card-announcement-new">
                <CardHeader>
                  <Row>
                    <Col md="8" xs="9">
                      <CardTitle type="h5">{isEdit === true ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
									
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={newscreate[1].error}
                        errorMessage={newscreate[1].errorMessage}
                        name='title'
                        value={newscreate[1].value}
                        label="Tiêu đề" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="6">
                      <Label>Ảnh bìa</Label>
                      <Input onChange={this.handleFileOnChange} type="file"/>
                    </Col>
                    <Col md="6">
                      <img src={newscreate[2].value||file} height="80" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialSelect
                        handleOnChange={this.handleOnSelectChange}
                        error={newscreate[0].error}
                        errorMessage={newscreate[0].errorMessage}
                        name='role'
                        value={newscreate[0].value}
                        data={data}
                        label="Bài viết doanh nghiệp" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Label>Mô tả</Label>
                        <p className="errorMessageUI">{newscreate[3].errorMessage}</p>
                        {isEdit&&newscreate[3].value &&
                          <Editor
                          initialValue={newscreate[3].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            height: 300,
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const newscreate = this.state.newscreate;
                            newscreate.map(prop => {
                              if (prop.name === "description") {
                                prop.value =data===""?" ":data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              newscreate
                            });
                        } }
                         />
                        }                       
                        {!isEdit&&
                          <Editor
                          initialValue={newscreate[3].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const newscreate = this.state.newscreate;
                            newscreate.map(prop => {
                              if (prop.name === "description") {
                                prop.value =data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              newscreate
                            });
                        } }
                         />
                        }                       
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Label>Nội dung</Label>
                        <p className="errorMessageUI">{newscreate[4].errorMessage}</p>
                        {isEdit&&newscreate[4].value &&
                          <Editor
                          initialValue={newscreate[4].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            height: 300,
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const newscreate = this.state.newscreate;
                            newscreate.map(prop => {
                              if (prop.name === "content") {
                                prop.value =data===""?" ":data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              newscreate
                            });
                        } }
                         />
                        }                       
                        {!isEdit&&
                          <Editor
                          initialValue={newscreate[4].value}
                          apiKey='yrnx9rhrf39887mo92nv8ijxs8luamymtbxjmr2j62rbu4g7'
                          init={{
                            plugins: 'link code lists',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist'
                          }}
                          onChange={ ( e ) => {
                            const data = e.target.getContent();
                            const newscreate = this.state.newscreate;
                            newscreate.map(prop => {
                              if (prop.name === "content") {
                                prop.value =data;
                                prop.error = false;
                                prop.errorMessage = "";
                                return prop;
                              }
                              return prop;
                            });
                            this.setState({
                              newscreate
                            });
                        } }
                         />
                        }                       
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <MaterialInputText
                        onChange={this.handleOnChange}
                        error={newscreate[5].error}
                        errorMessage={newscreate[5].errorMessage}
                        name='author'
                        value={newscreate[5].value}
                        label="Tác giả" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="12">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                        <div className="picker">
                          <DateTimePicker
                            value={createdAt}
                            disablePast
                            ampm={false}
                            onChange={this._handleOnChangeDatestart}
                            label="Thời gian bắt đầu"
                            showTodayButton
                            format="yyyy/MM/dd hh:mm"
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Row>

                    <Col md="12" className="text-right ">
                      <Link to="/admin-page/danh-sach-news/">
                        <Button className="btnExit" simple color="danger" style={{ width: "150px" }}>
                          <i className="fas fa-times" /> Thoát
                                    </Button>
                      </Link>
                      <Button className="btnSave ml-2" simple color="success" onClick={this.handleOnSubmit} style={{ width: "150px" }}>
                        <i className="fas fa-check" />{isEdit === true ? "Cập nhật" : "Lưu"}
                      </Button>

                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listNewsDetail: state.newsReducer.newsDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewsRequest: (
      enterprise_id, title, avatar, description, content, author, createdAt,file
    ) => {
      dispatch(
        actCreateNewsRequest(
          enterprise_id, title, avatar, description, content, author, createdAt,file
        )
      );
    },
    updateNewsRequest: (
      news_id, enterprise_id, title, avatar, description, content, author, createdAt,file
    ) => {
      dispatch(
        actUpdateNewsRequest(
          news_id, enterprise_id, title, avatar, description, content, author, createdAt,file
        )
      );
    },
    getListNewsID: (id) => {
      dispatch(
        actGetNewsByID(id)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsCreate);
NewsCreate.propTypes = {
  newscreate: PropTypes.object
};
