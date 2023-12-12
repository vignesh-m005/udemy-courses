package com.kafka.demo.consumer;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.CooperativeStickyAssignor;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class ConsumerDemoWithShutDown {

    private static final Logger log = LoggerFactory.getLogger(ConsumerDemoWithShutDown.class.getSimpleName());

    public static void main(String[] args) {
        log.info("I'm kafka user");

        String groupId = "my-java-application";
        String topic = "demo_java";
        //create consumer properties
        Properties properties = new Properties();

        properties.setProperty("bootstrap.servers", "cluster.playground.cdkt.io:9092");
        properties.setProperty("security.protocol", "SASL_SSL");
        properties.setProperty("sasl.mechanism", "PLAIN");
        properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.plain.PlainLoginModule required username='6hn71tzYznIZiBnxedLbXd' password='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY29uZHVrdG9yLmlvIiwic291cmNlQXBwbGljYXRpb24iOiJhZG1pbiIsInVzZXJNYWlsIjpudWxsLCJwYXlsb2FkIjp7InZhbGlkRm9yVXNlcm5hbWUiOiI2aG43MXR6WXpuSVppQm54ZWRMYlhkIiwib3JnYW5pemF0aW9uSWQiOjc2ODgzLCJ1c2VySWQiOjg5NDUwLCJmb3JFeHBpcmF0aW9uQ2hlY2siOiI3ODdkMTliNy01NTRiLTQxN2QtOTY3ZC1iZTVlNTRlMDEzOTcifX0.bdqmO-wBpweMRAjlgJnzLLU7R7dHmWJ7x_e4KrQUATQ';");

        //set consumer properties
        properties.setProperty("key.deserializer", StringDeserializer.class.getName());
        properties.setProperty("value.deserializer", StringDeserializer.class.getName());
        properties.setProperty("group.id", groupId);
        properties.setProperty("auto.offset.reset", "earliest");
        properties.setProperty("partition.assignment.strategy", CooperativeStickyAssignor.class.getName());

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);

        final Thread mainThread = Thread.currentThread();

        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                log.info("Detecting a shutdown, let's exit by calling consumer.wakeup()...");
                consumer.wakeup();


                //join the main thread
                try {
                    mainThread.join();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        try {

            consumer.subscribe(Arrays.asList(topic));
            while (true) {

                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(1000));

                for (ConsumerRecord<String, String> record : records) {
                    log.info("Key: " + record.key() + " | value: " + record.value());
                    log.info("Partition: " + record.partition() + " | Offset: " + record.offset());
                }
            }
        }catch (WakeupException e){
            log.info("Consumer is started shutdown");
        }catch (Exception e){
            log.error("Unexpected exception in the consumer "+e.getMessage());
        }finally {
            consumer.close();
        }
    }
}