import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const Statistic_Card = () => {

  const [inTrainingCount, setInTrainingCount] = useState(0);
  const [notInTrainingCount, setNotInTrainingCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);


  const fetchData = () => {

    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then((response) => {
       return response.json();
      })
      
      .then((customerData) => {
        const customers = customerData.content;
        const totalCustomers = customers.length;
        setTotalCustomers(totalCustomers);

        
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((trainingData) => {
            // Tarkista trainingData.content onko tyhjä vai ei
            const trainingArray = Array.isArray(trainingData) ? trainingData : [];

            // Hae asiakkaiden id
            const uniqueCustomerIdsInTraining = new Set(trainingArray.map((training) => training.customer.id));

            // laske inTrainingCount
            const inTrainingCount = uniqueCustomerIdsInTraining.size;

            // laske notInTrainingCount 
            const notInTrainingCount = totalCustomers - inTrainingCount;

            // Vaihda state
            setInTrainingCount(inTrainingCount);
            setNotInTrainingCount(notInTrainingCount);
          })
          .catch((trainingError) =>
            console.error('Error fetching training data:', trainingError)
          );
      })
      .catch((customerError) =>
        console.error('Error fetching customer data:', customerError)
      );
  };


  useEffect(() => {
    fetchData();
  }, []); 

  // Laske prosentti määrä kuinka moni on treeneissä
  const inTrainingPercentage = (inTrainingCount / totalCustomers) * 100;
  const notInTrainingPercentage = (notInTrainingCount / totalCustomers) * 100;

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Customers actively training"
            value={inTrainingCount}
          
            valueStyle={{
              color: '#3f8600',
            }}
            suffix={`(${inTrainingPercentage}%)`}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Customers not actively training"
            value={notInTrainingCount}
          
            valueStyle={{
              color: '#cf1322',
            }}
            suffix={`(${notInTrainingPercentage}%)`}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Statistic_Card;
