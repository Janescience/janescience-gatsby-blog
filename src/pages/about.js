import React  from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as Unicons from '@iconscout/react-unicons';


const About = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="About me" />
            <div className="about-container">
                <h3>About Me ☕️</h3>
                <p>สวัสดีครับ เว็บนี้ทำขึ้นมาเพื่อแนะนำตนเอง มันคงจะดีถ้าเข้ามาเว็บนี้แล้วเห็นหมดเลยว่าผมถนัดอะไร สนใจอะไร ทำอะไรมาบ้างในทางด้าน Programming และเอาไว้แบ่งปันความรู้ต่างๆที่ผมได้ศึกษา โดยจะนำมาสรุปและอธิบายให้เข้าใจ
                    สามารถทำตามได้ในรูปแบบของบทความ
                </p>
                <p>
                    ตั้งแต่เริ่มต้นทำงานถึงปีที่ตัดสินใจทำเว็บนี้ขึ้นมาคือต้นปี 2022 รวมแล้วทำงานมาทั้งหมด 4 ปีเต็มพอดี 
                    เริ่มจากได้ไปสหกิจศึกษากับ Soft Square ในตำแหน่ง Web Java Developer และได้กลับมาทำโปรเจคจบที่เป็นทั้ง Android Native และ Website 
                    หลังจากนั้นเลยตัดสินใจเดินสาย Web Developer และได้มาเป็น Full Stack Web Developer จนถึงปัจจุบัน
                </p>
                <p>
                    ทำไมต้องเขียนบทความ ? ผมว่าทุกคนในช่วงเริ่มต้นเป็น Programmer แรกๆ มันจะมีอะไรให้ศึกษา เรียนรู้ และต้องจำเยอะมากๆ ถ้าไม่จดไว้ที่ไหนสักที่ลืมแน่นอน ผมไม่อยากมานั่ง Research ใหม่ทุกครั้ง แต่เปลี่ยนจากที่จดไว้ดูคนเดียว
                    ได้มาแชร์ให้กับคนอื่นๆ และเนื้อหาต่างๆจะมีทั้งที่ผมศึกษา
                </p>
                <p>
                    Programming ที่ถนัดและเริ่มต้นมา คือ Java , Jquery , Javascript แต่ 1 ปีให้หลังมานี้ หันมาสนใจศึกษา
                    Node.js , Deno , Cloud Server , No Sql , Vue.js , React.js , Gatsby , Blockchain , Voice Assitant , Flutter 
                    โดยทั้งหมดนี้เพื่อทำงานและสิ่งที่ตัวผมเองสนใจ  

                </p>

                <h3>ทำไมต้อง Janescience ?</h3>
                <p>ทั้งหมดมาจากชื่อจริงของผมเอง แต่ไม่อยากเขียนตรงๆ ชื่อผมคือ เจนวิทย์</p>
                <p>
                    <b>Jane</b> - มาจาก เจน <br/>                  
                    <b>Science</b> - มาจากวิทย์ ที่คำเต็มคือ วิทยาศาสตร์ <br/>
                </p>
                <p>
                    เมื่อนำมาลองเขียนเต็มๆดู รู้สึกว่าค่อนข้างลงตัว ไม่ยาว ไม่อ่านยากเกินไป เขียนออกมาเป็นคำที่สวย และยังไม่เคยมีใครใช้
                    เลยได้มาเป็น <b>Janescience</b> 
                </p>

                <h3>ประวัติ</h3>
                <p>
                    <b>1995</b> เกิดและใช้ชีวิตที่ นครราชสีมา <br/>
                    <b>2017</b> เข้ามาสหกิจศึกษาในกรุงเทพที่ <a href="http://www.softsquaregroup.com/" target='_blank' className="have-under" style={{ color : '#0CCCA5' }} >Soft Square</a><br/>
                    <b>2018</b> หลังจากเรียนจบได้ทำงานต่อกับ <a href="http://www.softsquaregroup.com/" target='_blank' className="have-under" style={{ color : '#0CCCA5' }} >Soft Square</a> <br/>
                    <b>2021</b> ย้ายมาทำงานสาย Outsource ให้กับ <a href="https://www.ocean.co.th/" target='_blank' className="have-under" style={{ color : '#0CBCCC' }} >Ocean Life Insurance</a> <br/>
                    <b>2022</b> ย้ายมาทำงานให้กับ <a href="https://www.krungsri.com/en/personal" target='_blank' className="have-under" style={{ color : '#F5D02D' }} >Bay Bank</a> ยังคงเป็น Outsource ถึงปัจจุบัน <br/>
                </p>
                <a href="" target="_blank" className="button">Resume <Unicons.UilEye size="20"/></a>

                <h3><Unicons.UilHeartSign size="30"/></h3>
                <p>
                    Coding <Unicons.UilBracketsCurly size="15"/> , 
                    Hangout <Unicons.UilGlassMartini size="15"/> , 
                    Travel <Unicons.UilPlaneDeparture size="15"/> , 
                    Movie <Unicons.UilFilm size="15"/>, 
                    Music <Unicons.UilHeadphonesAlt size="15"/>, 
                    Table Tennis <Unicons.UilTableTennis size="15"/>
                </p>
                <hr/>
                <p>อัพเดตล่าสุด : 8 March 2022</p>
            </div>
        </Layout>
    )
}

export default About

export const pageQuery = graphql`
  query {
        site {
            siteMetadata {
                title
            }
        }
    }
`