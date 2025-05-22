package com.evernorth.profilesetup.service.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evernorth.profilesetup.service.database.entity.OrderItems;

import io.lettuce.core.dynamic.annotation.Param;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

    @Query("SELECT oi FROM OrderItems oi WHERE oi.userOrders.user.userID = :userID")
    List<OrderItems> findOrderItemsByUserID( @Param("userID") int userID );

    @Query("SELECT oi FROM OrderItems oi WHERE oi.userOrders.orderId = :orderID")
    List<OrderItems> findOrderItemsByID( @Param("orderID") Long orderID );

}