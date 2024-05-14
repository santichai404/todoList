import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { BoxItem } from "./styled";

const TodoList = () => {
  const [data, setData] = useState([
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ]);

  const [fruitData, setFruitData] = useState([]);
  const [vegetableData, setVegetableData] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState({});

  const onSelectData = async (row, index) => {
    if (row.type === "Fruit") {
      let result = row;
      result["delete"] = "0";
      setFruitData([...fruitData, result]);
      setData((prevData) => prevData.filter((t) => t.name !== result.name));
      if (timeoutIds[result.name]) {
        clearTimeout(timeoutIds[result.name]);
      }

      deleteOn5Sec(result);
    }
    if (row.type === "Vegetable") {
      let result = row;
      result["delete"] = "0";
      setVegetableData([...vegetableData, result]);
      setData((prevData) => prevData.filter((t) => t.name !== result.name));

      if (timeoutIds[result.name]) {
        clearTimeout(timeoutIds[result.name]);
      }
      deleteOn5Sec(result);
    }
  };

  const onDeleteFruit = (row, index) => {
    let result = row;
    result["delete"] = "1";
    setFruitData((prevFruit) =>
      prevFruit.filter((fruit) => fruit.name !== result.name)
    );
    setData((prevArray) => [...prevArray, result]);

    if (timeoutIds[result.name]) {
      clearTimeout(timeoutIds[result.name]);
      setTimeoutIds((prevTimeoutIds) => {
        const newTimeoutIds = { ...prevTimeoutIds };
        delete newTimeoutIds[result.name];
        return newTimeoutIds;
      });
    }
  };

  const onDeleteVegetable = (row, index) => {
    let result = row;
    result["delete"] = "1";
    setVegetableData((prevVegetable) =>
      prevVegetable.filter((vegetable) => vegetable.name !== result.name)
    );
    setData((prevArray) => [...prevArray, result]);

    if (timeoutIds[result.name]) {
      clearTimeout(timeoutIds[result.name]);
      setTimeoutIds((prevTimeoutIds) => {
        const newTimeoutIds = { ...prevTimeoutIds };
        delete newTimeoutIds[result.name];
        return newTimeoutIds;
      });
    }
  };

  const deleteOn5Sec = (result) => {
    if (result.type === "Fruit") {
      const timeoutId = setTimeout(() => {
        setFruitData((prevFruit) =>
          prevFruit.filter((fruit) => fruit.name !== result.name)
        );
        if (result.delete != "1") {
          setData((prevData) => [...prevData, result]);
        }
      }, 5000);

      setTimeoutIds((prevTimeoutIds) => ({
        ...prevTimeoutIds,
        [result.name]: timeoutId,
      }));
    }
    if (result.type === "Vegetable") {
      const timeoutId = setTimeout(() => {
        setVegetableData((prevVegetable) =>
          prevVegetable.filter((vegetable) => vegetable.name !== result.name)
        );
        if (result.delete != "1") {
          setData((prevData) => [...prevData, result]);
        }
      }, 5000);
      setTimeoutIds((prevTimeoutIds) => ({
        ...prevTimeoutIds,
        [result.name]: timeoutId,
      }));
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div style={{ marginTop: "60px" }}>
            {data.map((row, index) => (
              <BoxItem
                key={index}
                onClick={() => {
                  onSelectData(row, index);
                }}
              >
                {row.name}
              </BoxItem>
            ))}
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Fruit" style={{ height: "calc(100vh - 40px)" }}>
            {fruitData.length > 0 ? (
              <>
                {fruitData.map((row, index) => (
                  <BoxItem
                    key={index}
                    onClick={() => {
                      onDeleteFruit(row, index);
                    }}
                  >
                    {row.name}
                  </BoxItem>
                ))}
              </>
            ) : null}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Vegetable" style={{ height: "calc(100vh - 40px)" }}>
            {vegetableData.length > 0 ? (
              <>
                {vegetableData.map((row, index) => (
                  <BoxItem
                    key={index}
                    onClick={() => {
                      onDeleteVegetable(row, index);
                    }}
                  >
                    {row.name}
                  </BoxItem>
                ))}
              </>
            ) : null}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TodoList;
