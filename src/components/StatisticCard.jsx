import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const Statistic_Card = () => {

  const [inTrainingCount, setInTrainingCount] = useState(0);
  const [notInTrainingCount, setNotInTrainingCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);


  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then((response) => response.json())
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
            
            const trainingArray = Array.isArray(trainingData) ? trainingData : [];
  
            // Ota id asiakkaalta
            const uniqueCustomerIdsInTraining = new Set(
              trainingArray
                .filter((training) => training.customer && training.customer.id)
                .map((training) => training.customer.id)
            );
  
            
            const inTrainingCount = uniqueCustomerIdsInTraining.size;
  
     
            const notInTrainingCount = totalCustomers - inTrainingCount;
  
           
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
            suffix={`(${inTrainingPercentage.toFixed(0)}%)`}
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
            suffix={`(${notInTrainingPercentage.toFixed(0)}%)`}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Statistic_Card;