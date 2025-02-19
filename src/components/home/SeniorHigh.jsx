import { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton } from "antd";
import { FilePdfTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const SeniorHigh = () => {
  const navigate = useNavigate();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        Array.from({
          length: count,
        }).map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Link
              key="list-loadmore-view"
              to="/research"
              onClick={() => navigate("/research")}
            >
              View
            </Link>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "white" }}
                  icon={<FilePdfTwoTone />}
                />
              }
              title={item.name?.last}
              description="Janjan Hapa, Bryn, Igme"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default SeniorHigh;
