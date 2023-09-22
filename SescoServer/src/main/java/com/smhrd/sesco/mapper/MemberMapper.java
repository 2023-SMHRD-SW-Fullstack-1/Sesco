package com.smhrd.sesco.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.sesco.domain.Member;

@Mapper
public interface MemberMapper {

	// 기존회원 가입
	public void MemberJoin(Member member);

	// id 중복체크
	@Select("select count(*) from t_member where user_id=#{user_id} and user_d_yn='n'")
	public int id_Check(String userId);

	// 닉네임 중복체크
	@Select("select count(*) from t_member where user_nick=#{user_nick} and user_d_yn='n'")
	public int nick_Check(String user_nick);

	// 이메일 중복체크
	@Select("select count(*) from t_member where user_email=#{user_email} and user_d_yn='n'")
	public int email_Check(String user_email);

	// 가입여부조회
	@Select("select count(*) from t_member where user_id=#{user_id} and user_pw=#{user_pw} and user_d_yn='n'")
	public int userSelect(String user_id, String user_pw);

	// 기존회원 로그인
	@Select("select * from t_member where user_id=#{user_id} and user_pw=#{user_pw} and user_d_yn='n'")
	public Member MemberLogin(String user_id, String user_pw);

	// 아이디 찾기
	@Select("select user_id from t_member where user_name=#{user_name} and user_email=#{user_email}")
	public String SearchId(Member member);
	
	//비밀번호 찾기
	@Select("select user_pw from t_member where user_id=#{user_id} and user_email=#{user_email} and user_name=#{user_name}")
	public String SearchPw(Member member);

	// 기존회원탈퇴
	@Update("update t_member set user_d_yn='y' where user_id=#{user_id}")
	public void MemberDelete(String user_id);

	//구글계정 중복확인
	@Select("select count(*) from t_member where user_id=#{user_id} and user_name=#{user_name} and login_type='G'")
	public int GoogleUserCheck(Member member);
	
	// 구글 로그인 
	@Select("select * from t_member where user_id=#{user_id} and user_name=#{user_name} and login_type='G'")
	public Member GoogleLogin(Member member);


	//카카오 로그인
	@Select("select * from t_member where user_id=#{user_id} and user_name=#{user_name} and login_type='K'")
	public Member kakaoCallback(Member member);

	// 구글 회원가입
	public void GoogleJoin(Member member);

	
	


}