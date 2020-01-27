package com.airline.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.airline.model.Credentials;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.PaymentDetails;
import com.airline.model.Seats;
import com.airline.model.User;

@Repository("dao")
public class AirlineDaoImpl implements AirlineDao{
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Transactional
	public int insertUser(User user) {
		String sql1 = "INSERT INTO Credentials(User_Id, User_Name, Password) VALUES(user_id_seq.NEXTVAL, :userName, :password)";
		String sql2 = "INSERT INTO Passengers(Passenger_Id, First_Name, Last_Name, Gender, Email_Id, Mobile_Number, Age)"
					+ "VALUES(user_id_seq.CURRVAL, :firstName, :lastName, :gender, :userName, :mobileNo, :age)";
		
		Query query1 = entityManager.createNativeQuery(sql1);
		query1.setParameter("userName", user.getEmailId());
		query1.setParameter("password", user.getPassword());
		
		Query query2 = entityManager.createNativeQuery(sql2);
		query2.setParameter("firstName", user.getFirstName());
		query2.setParameter("lastName", user.getLastName());
		query2.setParameter("gender", user.getGender());
		query2.setParameter("userName", user.getEmailId());
		query2.setParameter("mobileNo", user.getMobileNumber());
		query2.setParameter("age", user.getAge());
		

		int credentialResult = query1.executeUpdate();
		int userResult = query2.executeUpdate();
		
		if(userResult==1 && credentialResult == 1){
			return 1;
		}
		else{
			return 0;
		}
	}

	public Credentials fetchCredentials(LoginCredentials credential) {
		String jpql = "SELECT c from Credentials c WHERE userName = :userName";
		TypedQuery<Credentials> query = entityManager.createQuery(jpql, Credentials.class);
		query.setParameter("userName", credential.getEmailId());
		try{
			return query.getSingleResult();
		}catch(Exception e){
			return null;
		}
	}

	public List<Flights> fetchFlights(FlightSearchDetails details) {
		String jpql = "SELECT f FROM Flights f WHERE source = :source "
						+ "AND destination = :destination "
						+ "AND departureDate = :departureDate "
						+ "AND availableSeats > :seats";
		TypedQuery<Flights> query = entityManager.createQuery(jpql, Flights.class);
		query.setParameter("source", details.getSource());
		query.setParameter("destination", details.getDestination());
		query.setParameter("departureDate", details.getDestinationDate());
		query.setParameter("seats", details.getSeats());
		return query.getResultList();
	}

	public List<String> fetchSeats(long flightId) {
		String jpql = "SELECT s FROM Seats s WHERE flightId = :flightId AND passengerId IS NOT null";
		TypedQuery<Seats> query = entityManager.createQuery(jpql, Seats.class);
		query.setParameter("flightId", flightId);
		List<String> seatList = new ArrayList<String>();
		List<Seats> list = query.getResultList();
		
		for (Seats seats : list) {
			seatList.add(seats.getSeatId());
		}		
		
		return seatList;
	}

	public PaymentDetails fetchPaymentConfirmation(PaymentDetails details) {
		String jpql = "SELECT p from PaymentDetails p WHERE cardNumber = :cardNumber";
		TypedQuery<PaymentDetails> query = entityManager.createQuery(jpql, PaymentDetails.class);
		query.setParameter("cardNumber", details.getCardNumber());
		return query.getSingleResult();
	}
}
