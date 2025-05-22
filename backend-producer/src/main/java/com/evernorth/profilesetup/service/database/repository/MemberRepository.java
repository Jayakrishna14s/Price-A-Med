package com.evernorth.profilesetup.service.database.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evernorth.profilesetup.service.database.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByMemberID(String memberID);
}
