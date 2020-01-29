package com.airline.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.airline.dao.AirlineDao;
import com.airline.model.FlightDetails;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.Passengers;
import com.airline.model.PaymentDetails;
import com.airline.model.SeatInfo;
import com.airline.model.Tickets;
import com.airline.model.User;

@Service("service")
@Scope(scopeName="singleton")
public class AirlineServiceImpl implements AirlineService {
	
	@Autowired
	private AirlineDao dao;

	public long registerUser(User user) {
		return dao.insertUser(user);
	}

	public long getUser(LoginCredentials credential) {
		return dao.fetchCredentials(credential);
	}

	public List<Flights> getFlightDetails(FlightSearchDetails details) {
		return dao.fetchFlights(details);
	}

	public List<String> getBookedSeats(long flightId) {
		return dao.fetchSeats(flightId);
	}

	public int getPaymentConfirmation(PaymentDetails details) {
		return dao.fetchPaymentConfirmation(details);
	}

	public int bookTicket(Tickets details) {
		return dao.bookTicket(details);
	}

	public void bookSeats(SeatInfo seatDetails) {
		dao.bookSeats(seatDetails);
	}

	public List<Tickets> getTicket(long userId) {
		return dao.fetchTicket(userId);		
	}

	public Passengers getUser(long userId) {
		return dao.fetchUser(userId);
	}

	public int addFlightDetails(FlightDetails details) {
		return dao.addFlights(details);
	}

	public int deleteFlight(long flightId) {
		return dao.removeFlight(flightId);
	}

	public List<String> getUserBookedSeats(long flightId, long userId) {
		return dao.fetchUserBookedSeats(flightId, userId);
	}

	public int cancelTicket(long ticketNumber) {
		return dao.cancelTicket(ticketNumber);
	}
}