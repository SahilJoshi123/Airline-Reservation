package com.airline.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.airline.model.User;

@Repository("dao")
public class AirlineDaoImpl implements AirlineDao{
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Transactional
	public int insertUser(User user) {
		String sql1 = "INSERT INTO Credentials(User_Id, User_Name, Password) VALUES(user_id_seq.NEXTVAL, :userName, :password)";
		String sql2 = "INSERT INTO users(user_Id, First_Name, Last_Name, Gender, Email_Id, Mobile_Number, Age)"
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

	public void retrieveUser() {
	}

}
