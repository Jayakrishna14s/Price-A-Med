package com.evernorth.profilesetup.kafka.partition;

import java.util.Map;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

public class CustomPartitioner implements Partitioner {
    private double nextPartition = 0;

    @Override
    public int partition(String arg0 /*topic */, Object arg1, byte[] arg2, Object arg3, byte[] arg4, Cluster arg5 /*cluster */) {
        int partitionCount = arg5.partitionsForTopic(arg0).size();
        int partition = (int) nextPartition;
        partition = partition % partitionCount;
        nextPartition = nextPartition + 0.5;
        System.out.println(partition);
        if(nextPartition > 1000 ) nextPartition -= 100;
        return partition;
    }

    @Override
    public void configure(Map<String, ?> arg0) {
        // Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'configure'");
    }

    @Override
    public void close() {
        // Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'close'");
    }
            
}




// return partition;

        // int partition = Integer.valueOf((String) arg1);
        // System.out.println( "  key: " + partition);
        // return partition;


        // load - balancing strategy
