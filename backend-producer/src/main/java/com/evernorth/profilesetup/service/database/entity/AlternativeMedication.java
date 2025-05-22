package com.evernorth.profilesetup.service.database.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AlternativeMedication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "med_id", nullable = false)
    private Medication medication;

    @ManyToOne
    @JoinColumn(name = "alt_med_id", nullable = false)
    private Medication alternative;

    public Long getId() {
        return id;
    }

    public Medication getAlternative() {
        return alternative;
    }

    public Medication getMedication() {
        return medication;
    }

    public void setAlternative(Medication alternative) {
        this.alternative = alternative;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMedication(Medication medication) {
        this.medication = medication;
    }
}

