//package com.evernorth.profilesetup.kafka.partition;
//
//import org.apache.kafka.clients.producer.Partitioner;
//import org.apache.kafka.common.Cluster;
//
//
//import java.util.Map;
//
//public class CustomPartitioner implements Partitioner {
//    private double nextPartition = 0;
//
//    @Override
//    public int partition(String s, Object o, byte[] bytes, Object o1, byte[] bytes1, Cluster cluster) {
//        int partitionCount = cluster.partitionsForTopic(s).size();
//        int partition = (int) nextPartition;
//        partition = partition % partitionCount;
//        nextPartition = nextPartition + 0.5;
//        System.out.println(partition);
//        if(nextPartition > 1000 ) nextPartition -= 100;
//        return partition;
//    }
//
//    @Override
//    public void close() {
//
//    }
//
//    @Override
//    public void configure(Map<String, ?> map) {
//
//    }
//}
