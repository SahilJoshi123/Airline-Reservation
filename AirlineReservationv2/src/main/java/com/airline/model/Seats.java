package com.airline.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component("seats")
@Scope(scopeName="prototype")
@Entity 
@IdClass(SeatsCompositeKey.class)
@Table(name="seats")
public class Seats {
	
	@Id
	@Column(name = "flight_id")
	private long flightId;
	
	@Id
	@Column(name = "seat_id")
	private String seatId;
	
	@Column(name = "passenger_id")
	private long passengerId;

	public long getFlightId() {
		return flightId;
	}

	public void setFlightId(long flightId) {
		this.flightId = flightId;
	}

	public String getSeatId() {
		return seatId;
	}

	public void setSeatId(String seatId) {
		this.seatId = seatId;
	}

	public long getPassengerId() {
		return passengerId;
	}

	public void setPassengerId(long passengerId) {
		this.passengerId = passengerId;
	}	
	
	
	/*@OneToOne
	@PrimaryKeyJoinColumn(name="passenger_id", referencedColumnName="user_id")
	private Credentials credential;
	
	@OneToMany
	@PrimaryKeyJoinColumn(name="flight_id", referencedColumnName="flight_id")
	private Flights flight;*/

}
