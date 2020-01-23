package com.airline.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.airline.dao.AirlineDao;
import com.airline.dao.AirlineDaoImpl;
import com.airline.model.Passengers;
import com.airline.model.User;

@Service("service")
@Scope(scopeName="singleton")
public class AirlineServiceImpl implements AirlineService {
	
	@Autowired
	private AirlineDao dao;

	public int registerUser(User user) {
		return dao.insertUser(user);
	}

	public int loginUser(String userName, String password) {
		// TODO Auto-generated method stub
		return 0;
	}

}
