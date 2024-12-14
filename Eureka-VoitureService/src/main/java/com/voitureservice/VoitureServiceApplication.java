	package com.voitureservice;

	import com.voitureservice.clients.ClientService;
	import com.voitureservice.entities.Client;
	import com.voitureservice.entities.Voiture;
	import com.voitureservice.repositories.VoitureRepository;
	import org.springframework.boot.CommandLineRunner;
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
	import org.springframework.cloud.openfeign.EnableFeignClients;
	import org.springframework.context.annotation.Bean;

	@SpringBootApplication
	@EnableDiscoveryClient
	@EnableFeignClients
	public class VoitureServiceApplication {
		public static void main(String[] args) {
			SpringApplication.run(VoitureServiceApplication.class, args);
		}

		@Bean
		CommandLineRunner initDatabase(VoitureRepository voitureRepository, ClientService clientService) {
			return args -> {
				Client client = clientService.findClientById(1L);
				voitureRepository.save(new Voiture(null, "Toyota", "Corolla", "ABC-123", client.getId(), client));
				voitureRepository.save(new Voiture(null, "Renault", "Clio", "XYZ-456", client.getId(), client));
			};
		}

	}
