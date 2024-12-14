package com.voitureservice.services;

import com.voitureservice.entities.Voiture;
import com.voitureservice.repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    // Save a voiture
    public Voiture saveVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    // Find all voitures
    public List<Voiture> findAllVoitures() {
        return voitureRepository.findAll();
    }

    // Find a voiture by ID
    public Voiture findVoitureById(Long id) {
        return voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable"));
    }

    // Find voitures by client ID
    public List<Voiture> findVoituresByClientId(Long clientId) {
        return voitureRepository.findByIdClient(clientId);
    }
    public void deleteVoiture(Long id) {
        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable"));
        voitureRepository.delete(voiture);
    }

}
