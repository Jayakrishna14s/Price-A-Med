package com.evernorth.profilesetup.service.database.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false)
    private PharmMedInfo pharmMedInfo; // Reference to PharmMedInfo entity

    @ManyToOne
    @JoinColumn(name = "orderId", referencedColumnName = "orderId")
    private UserOrders userOrders; // Link to UserOrders entity

    // @Column(name = "item_name")
    // private String itemName;

    @Column(name = "quantity")
    private Integer quantity;

    // @Column(name = "price_per_item")
    // private Double pricePerItem;

    public OrderItems() {}

    public OrderItems( PharmMedInfo pharmMedInfo, UserOrders userOrders, Integer quantity ) {
        this.pharmMedInfo = pharmMedInfo;
        this.userOrders = userOrders;
        this.quantity = quantity;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PharmMedInfo getPharmMedInfo() {
        return pharmMedInfo;
    }

    public void setPharmMedInfo(PharmMedInfo pharmMedInfo) {
        this.pharmMedInfo = pharmMedInfo;
    }

    public UserOrders getUserOrders() {
        return userOrders;
    }

    public void setUserOrders(UserOrders userOrders) {
        this.userOrders = userOrders;
    }

    // public String getItemName() {
    //     return itemName;
    // }

    // public void setItemName(String itemName) {
    //     this.itemName = itemName;
    // }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    // public Double getPricePerItem() {
    //     return pricePerItem;
    // }

    // public void setPricePerItem(Double pricePerItem) {
    //     this.pricePerItem = pricePerItem;
    // }
}

