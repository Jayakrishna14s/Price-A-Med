package com.evernorth.profilesetup.service.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evernorth.profilesetup.service.database.entity.CartItem;

import io.lettuce.core.dynamic.annotation.Param;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT c FROM CartItem c WHERE c.user.userID = :userID")
    List<CartItem> findByUserID( @Param("userID") int userID );

    @Query("SELECT c.item.id FROM CartItem c WHERE c.user.userID = :userID")
    List<Long> findItemIdsByUserID( @Param("userID") int userID );

    @Query("SELECT c FROM CartItem c WHERE c.user.userID = :userID AND c.item.id = :itemID")
    Optional<CartItem> findByUserIDAndItemID(@Param("userID") int userID, @Param("itemID") Long itemID);

    @Query("SELECT c.item.id AS item_id, c.quantity AS quantity FROM CartItem c WHERE c.user.userID = :userID")
    List<Object[]> findQuantitiesByUserID( @Param("userID") int userID );

    @Query("DELETE FROM CartItem c WHERE c.user.userID = :userID")
    void clearUserCart( @Param("userID") int userID );
    
}
