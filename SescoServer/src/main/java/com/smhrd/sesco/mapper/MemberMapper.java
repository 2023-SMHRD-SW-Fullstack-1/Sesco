package com.smhrd.sesco.mapper;

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

	// 회원정보수정
	public void MemberUpdate(Member member);

	// 기존회원탈퇴
	@Update("update t_member set user_d_yn='y' where user_id=#{user_id}")
	public void MemberDelete(String user_id);

}