package com.kafka.demo.producer;

import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

public class ProducerDemoWithCallBack {

    private static final Logger log = LoggerFactory.getLogger(ProducerDemoWithCallBack.class.getSimpleName());

    public static void main(String[] args) {
        log.info("Hello World");

        //create Producer properties
        Properties properties = new Properties();

        properties.setProperty("bootstrap.servers","cluster.playground.cdkt.io:9092");
        properties.setProperty("security.protocol","SASL_SSL");
        properties.setProperty("sasl.mechanism","PLAIN");
        properties.setProperty("sasl.jaas.config","org.apache.kafka.common.security.plain.PlainLoginModule required username='6hn71tzYznIZiBnxedLbXd' password='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY29uZHVrdG9yLmlvIiwic291cmNlQXBwbGljYXRpb24iOiJhZG1pbiIsInVzZXJNYWlsIjpudWxsLCJwYXlsb2FkIjp7InZhbGlkRm9yVXNlcm5hbWUiOiI2aG43MXR6WXpuSVppQm54ZWRMYlhkIiwib3JnYW5pemF0aW9uSWQiOjc2ODgzLCJ1c2VySWQiOjg5NDUwLCJmb3JFeHBpcmF0aW9uQ2hlY2siOiI3ODdkMTliNy01NTRiLTQxN2QtOTY3ZC1iZTVlNTRlMDEzOTcifX0.bdqmO-wBpweMRAjlgJnzLLU7R7dHmWJ7x_e4KrQUATQ';");


        //set producer properties
        properties.setProperty("key.serializer", StringSerializer.class.getName());
        properties.setProperty("value.serializer", StringSerializer.class.getName());

        //Create the Producer
        KafkaProducer<String,String> producer = new KafkaProducer<>(properties);

        for(int i =1 ;i < 11; i++){
            //Create producer record
            ProducerRecord<String,String> producerRecord = new ProducerRecord<>("demo_java","hello world "+i);

            //Send data
            producer.send(producerRecord, new Callback() {
                @Override
                public void onCompletion(RecordMetadata metadata, Exception exception) {
                    //executes every time a record is successfully sent or an exception is thrown

                    if (exception == null){
                        log.info("Received new metadata \n " +
                                "Topic: "+metadata.topic() + "\n" +
                                "Partition: "+metadata.partition() + "\n" +
                                "Offsets: "+metadata.offset() + "\n" +
                                "Timestamp: "+metadata.timestamp() + "\n");
                    }else{
                        log.error("Error while producing "+ exception.getMessage());
                    }
                }
            });
        }



        //tell the producer to send all data and block until done -- synchronous
        producer.flush();

        //flush and close the producer
        producer.close();
    }
}