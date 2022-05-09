import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useHistory, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector, useDispatch } from "react-redux";
import {
  FetchCategoryList,
  DeleteCategory,
  DeleteSubCategory,
} from "../../../redux/category/CategoryAction";

const CategoryDelete = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const allcategoryData = useSelector((d) => d.category.list);
  const [data, setData] = useState({
    mainImage: "",
    mainName: "",
    subImage: "",
    subName: "",
    selectSub: "",
  });

  const [subId, setsubId] = useState("");
  const [subDataList, setsubDataList] = useState([]);
  const [subData, setsubData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    dispatch(FetchCategoryList());
  }, [dispatch]);

  useEffect(() => {
    const filterData = allcategoryData?.filter((d) => d.id === +params.id);

    setsubDataList(filterData);
  }, [allcategoryData]);

  useEffect(() => {
    const filterData = subDataList?.[0]?.sub_category?.filter((d) => {
      return d.id === subId;
    });

    setsubData(filterData);
  }, [subId]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(DeleteCategory({ category_id: +params.id }));
    history.push("/category/list");
  };

  const submitHandler2 = (e) => {
    e.preventDefault();

    dispatch(DeleteSubCategory({ sub_category_id: +subId }));
    history.push("/category/list");
  };

  const backHandler = () => {
    history.push("/category/list");
  };

  return (
    <Container className="category-edit">
      <div className="title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Delete Category</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="sub-title">
          <span>Main Category</span>
        </div>
        <form className="form">
          <div className="category-item">
            <img
              src={
                subDataList?.[0]?.image
                  ? "https://api.komeserv.com" + subDataList?.[0]?.image
                  : "https://image.shutterstock.com/image-vector/grunge-green-category-word-round-260nw-1794170542.jpg"
              }
              alt="category"
              className="img"
            />
            <div className="icon">
              <input
                type="file"
                id="add-icon"
                name="mainImage"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="item">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="mainName"
              placeholder={
                subDataList?.[0]?.title
                  ? subDataList?.[0]?.title
                  : data.mainName
                  ? data.mainName
                  : ""
              }
              autoComplete="off"
            />
          </div>
        </form>
        <div className="action">
          <button onClick={submitHandler} className="activeBtn">
            Delete
          </button>
        </div>
      </Card>
      <Card width="768px" margin="24px auto">
        <div className="sub-title">
          <span>Sub Category</span>
        </div>
        <form className="form">
          <div className="category-item" style={{ marginRight: "24px" }}>
            <img
              src={
                subData?.[0]?.image
                  ? "https://api.komeserv.com" + subData?.[0]?.image
                  : "https://image.shutterstock.com/image-vector/grunge-green-category-word-round-260nw-1794170542.jpg"
              }
              alt="category"
              className="img"
            />
            <div className="icon">
              <input
                type="file"
                id="add-icon2"
                name="subImage"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="align">
            <div className="item">
              <FormControl sx={{ width: "100%" }}>
                <label className="form-label">sub Category</label>
                <Select
                  input={<InputBase className="select" />}
                  displayEmpty
                  name="selectSub"
                  value={data.selectSub}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#636c72",
                          }}
                        >
                          Select Option
                        </span>
                      );
                    } else {
                      return (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#6c757d",
                          }}
                        >
                          {selected}
                        </span>
                      );
                    }
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="" sx={{ fontSize: "14px" }}>
                    Select Option
                  </MenuItem>
                  {subDataList?.[0]?.sub_category?.map((d) => {
                    return (
                      <MenuItem
                        key={d.id}
                        value={d.title}
                        sx={{ fontSize: "14px", color: "#1a1c23" }}
                        onClick={() => setsubId(d.id)}
                      >
                        {d.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="item" style={{ marginTop: "24px" }}>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="subName"
                placeholder={subData?.[0]?.title}
                autoComplete="off"
              />
            </div>
          </div>
        </form>
        <div className="action">
          <button onClick={submitHandler2} className="activeBtn">
            Delete
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default CategoryDelete;
