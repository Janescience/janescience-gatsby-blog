---
title: เมื่อต้องใช้ Git Workflow
date: "2022-02-24T22:12:03.284Z"
featuredImage : git-flow.jpeg
tag : "Git"
---

![Git Workflow](git-flow.jpeg)
*<center>ขอบคุณรูปภาพจาก (https://tigosoftware.com/sites/default/files/2021-07/git-flow.jpg)</center>*

สวัสดีครับ วันนี้ผมจะมาพูดถึงการใช้ Git ที่ดีขึ้นและใช้ได้อย่างเต็มประสิทธิภาพ ก่อนอื่นเลยต้องรู้จัก Git มาบ้าง และถ้าเคยใช้มาแล้ว ก็จะยิ่งเข้าใจง่ายขึ้นครับ แต่ถ้ายังไม่เคยใช้เลย ก็สามารถอ่านและศึกษาได้ เนื้อหาทั้งหมดจะมีประมาณนี้ครับ


- [จุดเริ่มต้น](#จุดเริ่มต้น)
- [Git Workflow คืออะไร ?](#git-workflow-คืออะไร-)
- [หลักการมีอะไรบ้าง ?](#หลักการมีอะไรบ้าง-)
- [ลองทำ Git Workflow - Step By Step](#ลองทำ-git-workflow---step-by-step)
    - [Create/Setup Repository](#createsetup-repository)
      - [อธิบาย Git Command Line](#อธิบาย-git-command-line)
    - [Protect Branches](#protect-branches)
    - [Develop](#develop)
    - [Pull Request](#pull-request)
    - [Code Review](#code-review)
      - [หลักการ](#หลักการ)
      - [จุดประสงค์](#จุดประสงค์)
    - [Resolve Conflict Code](#resolve-conflict-code)
    - [Release Version](#release-version)
    - [Hotfix](#hotfix)
- [Conclusion](#conclusion)
    - [ผลกระทบต่างๆที่เกิดขึ้นเมื่อใช้งานจริง](#ผลกระทบต่างๆที่เกิดขึ้นเมื่อใช้งานจริง)
    - [การเปลี่ยนแปลงที่ดีขึ้น](#การเปลี่ยนแปลงที่ดีขึ้น)

# จุดเริ่มต้น

ผมขอเล่าก่อนเลยว่าปกติงานทุกวันนี้ได้ใช้ Git ในระดับพื้นฐานอยู่แล้ว จะเป็นประมาณว่า Develop อยู่บน Branch เดียวเลยครับ คือ `master` อย่างมากที่สุดอาจจะแตก Branch ออกมาบ้างแยกออกมาตามงาน แต่สุดท้ายแล้วทั้ง Dev , UAT ,  Production ใช้ `master` หมดเลย 
ซึ่งเป็นวิธีที่ใช้ได้แหล่ะครับ แต่มันค่อนข้างจะไม่ถูกต้องเท่าไหร่ แทบจะไม่ได้ดึงประสิทธิภาพของการใช้ Git ออกมาเลยก็ว่าได้
> Note : Git Workflow มีหลายแบบ ที่กล่าวมาข้างต้นเป็นแบบที่ใช้ง่าย เข้าใจง่ายที่สุด ซึ่งจะเลือกใช้แบบไหนก็ขึ้นอยู่กับ Project ซึ่งผมเองคิดว่าวิธีนี้ไม่เหมาะกับ Project ที่ผมกำลังทำอยู่ครับ

และพอใช้วิธีนี้ไปสักพัก ก็เจอปัญหาจริงๆครับ เพราะการทำงานของ Developer ก็ได้มีการพัฒนาไปเรื่อยๆตาม Requirement ใครทำเสร็จก็ Push code ขึ้นไปเรื่อยๆ จนตอนนี้ ใน `master` มี 10 Feature เข้าไปแล้ว แต่พอถึงเวลาที่ต้อง Deploy UAT หรือ Production ใน Version นี้ต้องการแค่ 5 Feature เท่านั้น แค่ได้ยินประโยคนี้ 
ก็รู้สึกทันทีว่าปวดหัวแน่นอนครับ ต้องมา Manual แยก 5 Feature นั้นออกมา ซึ่งเสี่ยงมากๆ ไหนจะ `merge` ผิด `merge` ไม่ครบ และต้องมานั่ง Test ใหม่อีก วุ่นวายมากครับ ซึ่งจริงๆแล้ว Version นี้มันควรจะถูก Test แค่เฉพาะ Version นี้และ Freeze ไว้เตรียมรอ Deploy เท่านั้นครับ

เลยทำการศึกษาการใช้งาน Git อย่างจริงจัง จนไปเจอวิธีที่เรียกว่า Git Workflow จากบทความนี้เลยครับ
> [10 ขั้นตอนการทำ Workflow ร่วมกับ Github ตั้งแต่เริ่มต้น](https://medium.com/20scoops-cnx/github-workflow-from-scratch-99b07e8c318b) 

หลังจากศึกษาและนำมาใช้งานจริง พบว่ามีรายละเอียดยิบย่อยมากมาย คำถามและความสงสยเกิดขึ้นในหลายๆเคส รวมถึงกระทบการทำงานในตำแหน่งอื่นๆด้วย กว่าทางทีมจะหาวิธีที่ลงตัวได้และแก้ปัญหาได้ครบทุกเคส ใช้เวลาอยู่พอสมควร เลยอยากจะนำมาแชร์ให้ฟังครับ 

# Git Workflow คืออะไร ?
เป็น Best Practice ที่ใช้ในการจัดการ Branch เพื่อให้เป็นมาตรฐานในการใช้ Git ทำงานร่วมกัน
 และยังเป็นการใช้ Git ได้อย่างเต็มประสิทธิภาพ

# หลักการมีอะไรบ้าง ?
1.  แยก Branch หลักออกตาม Environment ของงานเพื่อแยก Code ให้ชัดเจน จากปกติมีแค่ `master` เราจะสร้าง Branch เพิ่ม มีประมาณนี้ 
- `dev` - สำหรับตอน Dev หรือ SIT ที่ใช้กันภายใน  
- `uat` - สำหรับ Phase ที่ให้ Users ภายใน Test ระบบ อันนี้จะคล้ายๆ `master` (Optional)
- `master` - สำหรับ Production 

2.  ทำการ Protect Branches ไม่ให้สามารถ `merge` , `push` และ `delete` Branch ต่างๆผ่าน Command ได้ ต้องทำผ่าน Github UI และเฉพาะคนที่มีสิทธิเท่านั้น เพื่อป้องกันการผิดพลาด บางทีอาจะเผลอหรือลืมกันได้ครับ 

3. แยก Task ตามการตั้งชื่อ Branch ย่อยที่จะแตกออกมาจาก Branch หลักอีกที แบ่งได้เป็น 
- `feature/xxxx` - สำหรับงานที่เป็นการสร้าง Feature ใหม่ขึ้นมาเท่านั้น 
- `bug/xxxx` - สำหรับงานที่แก้ Bug เท่านั้น  
- `chore/xxxx` -  สำหรับงานอื่นๆที่ไม่ได้อยู่ใน Plan อย่างเช่น ต้องการเปลี่ยนการเขียน Code ในส่วนนี้ ซึ่งไม่ได้เป็นทั้ง Feature หรือว่า Bug
- `hotfix/xxxx` - เมื่อเกิด Bug ที่ Production แตกออกมาจาก `master` โดยตรง ไม่ควรจะเป็น Bug ที่รุนแรง ควรจะเป็นบัคที่แก้ไม่เยอะ และไม่ส่งผลต่อการทำงานส่วนอื่น  เมื่อเสร็จแล้วต้องนำกลับไป `merge` กับ Branch อื่นๆที่เหลือด้วย 
- `release/v.xxx` - สำหรับ Release Version ขึ้น Production และบน Github ถ้าเราทำ Tags ทุกครั้งที่เรา Release จะมีการ Backup เป็น .zip , .tar.gz  ไว้ให้เราอีกด้วย
หลังจาก Develop เสร็จและ Merge เข้า Branch หลักแล้ว ควรลบ Branch ย่อยทั้งหมดนี้ออกด้วย  

4. กำหนด Commit Message ให้ใช้ Format เดียวกันเพื่อจะได้เข้าใจตรงกัน  `git commit -m "[issue/task_number] commit message"` ตรง Commit Message ควรจะอธิบายให้เข้าใจว่างานนี้ทำอะไร แต่ไม่จำเป็นต้องยาวมาก 

5. กำหนดเงื่อนไขในการ `merge` จะไม่สามารถ `merge` ได้ ถ้าไม่ผ่านการ Review Code , Code ชนกัน , Code ยังไม่ล่าสุด  เป็นต้น (สามารถเลือกได้ว่าจะให้มีเงื่อนไขอะไรบ้าง) และคนที่สามรถ `merge` หรือ Review Code ได้ต้องกำหนดว่าเป็นใคร ส่วนมากแล้วแต่ล่ะ Project จะไม่เกิน 2-3 คน
> Note : ซึ่งรายละเอียดของแต่ล่ะวิธีสามารถกำหนดเองได้ตามความเหมาะสม ข้อตกลงของทีมหรือโปรเจคที่กำลังทำอยู่ ซึ่งจากที่ผมได้ศึกษามาและลองปรับใช้มาได้วิธีตามนี้ครับ

จากที่อธิบายมาทั้งหมด อาจจะพอเข้าใจได้บ้างว่าหลักการเป็นประมาณไหน แต่อาจจะยังไม่เข้าใจและเห็นภาพชัดเจน งั้นต่อไปผมจะลองทำให้ดูจริงๆเลย แบบ Step By Step 

# ลองทำ Git Workflow - Step By Step
> ถ้าในเครื่องยังไม่มี Git ต้อง [Download & Install](https://git-scm.com/downloads) ก่อน และเนื้อหาต่อไปนี้จะใช้ Git Command Line เป็นหลักนะครับ


### Create/Setup Repository
 เริ่มจากสร้าง Repository บน Github ผมจะสร้างเป็นแบบ Public นะครับ ถ้าสร้างเป็นแบบ Private เรื่องการ Protected Branch จะไม่สามารถทำได้ครับ ต้องเสียเงิน
1. ไปที่เมนูรูป + ขวาบน เลือก **"New repository"**
2. ตั้งชื่อ Repository ครับ และเลือกเป็น Public

![Create New Repository](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/create-new-repo.png)

3. เมื่อกดสร้างแล้ว ถ้าเราไม่ติ้กเลือก **"Add a README file"** จะมาเจอกับหน้านี้ ทาง Github จะบอกว่ามีวิธีอะไรบ้างที่สามารถสร้าง Repository หรือ Sync Repository จากที่เห็นจะสามารถสร้างผ่าน Command Line , Sync ผ่าน Command Line หรือ Import 

![Sync Repository](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/guide-remote.png)

4. แต่เราได้สร้าง Repository บน Github แล้ว เหลือแค่ต้อง Sync กับ Project ในเครื่องของเรา **"สร้าง Folder ตั้งชื่อตาม Repo > เปิด Terminal ขึ้นมา > cd เข้าไปใน Project > ใช้คำสั่ง Command ตามนี้"**

```bash
git init
echo "# Git Workflow Example" >> README.md
git remote add origin https://github.com/Janescience/git-workflow-example.git
git branch -M master
git add .
git commit -m "init"
git push origin master

```

5. กลับไปที่ Github และ Refresh Repository ของเราจะเป็นแบบนี้ (ถ้าเราเลือก Add a README file ตั้งแต่ตอนสร้าง จะแสดงหน้านี้เลย)

![Git Repository](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/git-repo.png)

#### อธิบาย Git Command Line

`git init` - สร้าง Folder .git ใน Project เพื่อให้สามารถใช้คำสั่งของ git ได้

`echo "# Git Workflow Example" >> README.md` - สร้างไฟล์ README.md โดยให้เนื้อหาภายในเป็น # Git Workflow Example เนื่องจาก `git` ไม่สามารถ `push` Project เปล่าได้

`git remote ...` - Sync Project กับ Repository บน Github ต้องไป Copy URL ของ Repository มา

`git branch -M master` - ตั้งค่า Default Branch ให้เป็น `master` (เนื่อง Git เปลี่ยน Default Branch จาก `master` มาเป็น `main` แต่ผมอยากใช้ `master` มากกว่า 😂)

`git add .` - เป็นการบอกว่าเราต้องการเอาไฟล์อะไรบ้างที่มีการอัพเดต `push` ไปยัง Repository บน Github โดยหลัง `git add` ถ้าใส่ `.` คือเอาทุกไฟล์ที่มีการอัพเดต แต่ถ้าต้องการแค่บางไฟล์ ต้องทำแบบนี้ `git add README.md xxxxxx xxxxxx` ถ้าหลายไฟล์ต้องคั่นด้วยเว้นวรรค

6. เพิ่ม Users อื่นๆที่เกี่ยวข้องกับ Project นี้เข้าไปด้วย เราจะจำลองให้เหมือนว่า Project นี้ร่วมกันทำงานหลายคน เพราะสุดท้ายยังไงก็ต้องมีการเลือก User ที่จะสามารถ Merge หรือ มา Review และเมื่อมี Action ต่างๆเกิดขึ้น User ที่เกี่ยวข้องจะได้รับรู้ด้วย ให้ไปที่ **"Settings > Collaborators > Add people > ค้นหาด้วยชื่อหรือ Username > Add ... to this repository"** User นี้จะได้รับ Email invite ต้องเข้าไปกด Accept invitation ด้วย

![Invite](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/invite.png)


### Protect Branches 

การ Protect Branches ทั้งหมด ทำบน Github UI

1. สร้าง Branch อื่นๆเพิ่ม ของผมจะสร้างแค่ `dev` โดยการพิมพ์ชื่อ Branch ที่เราต้องการสร้าง ถ้ายังไม่มี จะมีให้กด **"Create branch: dev from `master`"**

![Create Branch](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/create-branch.png)

2. เปลี่ยน Default Branch จาก `master` เป็น `dev` ไปที่  "***Settings > Branches > คลิก Icon Swip ข้างๆดินสอ > เลือก `dev` > กด Update***" เพราะเมื่อเรา `git clone` เพื่อที่จะ Clone Project ลงมาที่เครื่อง Branch หลักจะได้เป็น `dev`

![Cahnge Default Branch](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/change-def-branch.png)

![Git Clone Dev](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/git-clone-dev.png)

3. Protect Branches ให้ไปที่ "***Settings > Branches > Add rule***" จะมาเจอกับหน้านี้

![Protect Branches](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images//protect-branch.png)

**"Branch name pattern"** - กรอกชื่อ Branches ได้มากกว่า 1 อย่างในรูป ผมกรอกไป 2 Branches `dev` , `master`

**"Require a pull request before merging"** - ต้องมีการสร้าง Pull Request ก่อน Merge และ ต้องมีการ Approve หรือไม่ และมีกี่คน

**"Require status checks to pass before merging"** - ต้องผ่าน Status Check ก่อนถึงจะ Merge ได้ เช่น Code ไม่ล่าสุด หรือ Code ชนกัน ก็จะ Merge ไม่ได้

![Protect Branch Admin](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/protect-branch-admin.png)

**"Include administrators"** - เป็นการบอกว่า Rules ทั้งหมด บังคับใช้กับ Admin ด้วย ถ้าไม่เลือกอันนี้ คนที่สร้าง Repo นี้จะยังสามารถ `push` ได้ครับ

4. ทดสอบที่เรา Config ไปโดยลองแก้ไขไฟล์ README.md ใน `dev` และลอง `push` 

![Git Push Dev](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/git-push-dev.png) 

*จะเห็นว่ามี error บอกว่า ต้องมีอย่างน้อย 1 คน ที่ Review Code และ Approved ไม่สามารถ `push` ตรงๆได้*


### Develop

1. ทุกครั้งที่จะเริ่ม Code หรือแก้ไขอะไรก็ตาม ควรที่จะ `git pull` ก่อน เพื่อให้ Code ของเราล่าสุด เผื่อก่อนหน้านั้นมีคนอื่นได้ทำอะไรเพิ่มขึ้นมา Code จะได้ไม่ชนกัน

2.  แตก Branch ออกมาจาก `dev` โดยตั้งชื่อว่า `feature/update-readme` (ถ้า Run คำสั่งแล้วเราจะย้ายมาอยู่ Branch ที่เราสร้างทันที สามารถเริ่ม Code ได้เลย)

```bash
git checkout -b feature/update-readme 
```

`git checkout  -b [branch name]` - คือ การ Checkout (การย้าย Branch) และสร้าง Branch พร้อมกัน ตามด้วยชื่อ Branch

> *Note* : ถ้าไม่แน่ใจว่าตอนนี้เราอยู่ Branch ไหน หรือ Command Line ของเราไม่ได้บอก สามารถใช้คำสั่ง `git branch` แล้วให้ดูที่เครื่องหมาย * ว่าอยู่ที่อันไหน และยกเลิกด้วยการกด `Shift + :`  แล้วกด `q`

3. เมื่อเรา Code เสร็จแล้ว เราต้อง `push` Branch นี้ขึ้น เพื่อไปสร้าง Pull Request และ Review Code ต่อ โดยใช้คำสั่งตามนี้

```bash
git status
git add .
git commit -m "[#CONTENT001] Add content 'Practice push new feature' on README.md"
git push origin feature/update-readme
```

4. หลังจาก Push ควรดู Result ด้วยว่า Success หรือเปล่า ถ้า Success ต้องขึ้นประมาณนี้

```bash
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (6/6), 625 bytes | 625.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'feature/update-readme' on GitHub by visiting:
remote:      https://github.com/Janescience/git-workflow-example/pull/new/feature/update-readme
remote: 
To https://github.com/Janescience/git-workflow-example.git
 * [new branch]      feature/update-readme -> feature/update-readme
```
*อันนี้คือจบ Process ที่ต้องทำในเครื่องของเราแล้ว ต่อไปเป็น Process ที่ Github UI*

### Pull Request

พูดง่ายๆคือเป็นการร้องขอ Merge code จาก Branch ที่ได้ Push ขึ้นไป เพื่อ Merge เข้ากับ Branch หลัก โดยใน Pull request จะมีเงื่อนไข รายละเอียด การตรวจสอบต่างๆ 

> ผมยังสงสัยว่าทำไม Github ถึงใช้คำว่า Pull request ตามหลักความเข้าใจ มันควรจะเป็น Merge request มากกว่า ซึ่งถ้าเป็น Version control ของเจ้าอื่น อย่าง Gtilab , Bitbucket ก็จะใช้คำต่างออกไป

1. เมื่อเข้ามาหน้า Github จะเห็นเลยว่า Auto ขึ้นมาให้แล้ว เพียงแค่กด *Compare & pull request* ซึ่งถ้าไม่ได้ Auto ขึ้นมาเราต้องไปที่ "*Pull requests > New pull request > เลือก Branches*" เจ้าของ Branch ควรเป็นคนสร้าง

![Wait Pull Request](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/wait-pull-request.png)

2. ก่อนจะสร้าง Pull request ต้องเลือก Branch หลักที่ต้องการ Merge , ตั้งชื่อหัวข้อ และเขียนรายละเอียด ควรจะเขียนให้ละเอียด ว่าทำอะไรบ้าง มีรูปภาพด้วยยิ่งดี ในกรณีที่เป็น Feature ใหญ่หรือมีการแก้ไขอะไรเยอะๆ เพื่อให้คนที่มา Review ได้เข้าใจ ในตัวอย่างไม่ได้แก้ไขอะไรเยอะ เลยอธิบายสั้นๆ

![Wait Pull Request](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/create-pull-request.png)

3. เมื่อสร้าง Pull request แล้ว Github จะตรวจสอบเงื่อนไขต่างๆ ว่าสามารถ Merge ได้หรือไม่ ในตัวอย่างบอกว่าไม่สามารถ Merge ได้ เพราะยังไม่ผ่านการ Review จะมีข้อความเป็นสีแดง ว่าติดเงื่อนไขอะไรบ้าง และ Disable ปุ่ม Merge ไว้ ซึ่งคนที่สร้าง Pull request ต้องเป็นคนเลือกว่าจะให้ใครมา Review ไปที่ฝั่งขวา จะเห็นคำว่า Reviewers ให้กดที่รูปฟันเฟือง เลือกได้สูงสุด 15 คน

![Merge Pull Request](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/merge-pull-request.png)

*หลังจากสร้าง Pull request แล้วควรตรวจสอบ Code ให้เรียบร้อยอีกรอบ ว่า Commit มาครบหรือไม่ ? , มี Code อื่นๆเกินมาหรือไม่ ? อะไรที่มันเล็กๆน้อยๆ ไม่ควรหลุดไปถึงคน Review*

> ตอนทำงานจริงในส่วนของ Developer จะจบแค่ตรงนี้เลย ต่อไป Senior หรือ Lead ต้องมารับช่วงต่อในส่วนของ Review code และ Merge pull request 

### Code Review

คนที่ต้อง Review เมื่อเข้ามาหน้า Github ให้ไปที่ "**Pull requests > เลือก Branch > Tab : Files changed**" หรือ จะเข้าผ่าน Email ก็ได้ 

#### หลักการ

- Review code แต่ล่ะครั้งไม่ควรเกิน 30 นาที และควรจะแบ่งเวลา กำหนดรอบให้ชัดเจน ไม่งั้นอาจจะเป็นการรบกวนคนที่ Review มากเกินไปจนอาจกระทบกับงานส่วนตัว

- คน Review ควรให้ความสำคัญกับการทำงานและผลกระทบของ Code เป็นหลัก เช่น มีผลทำให้ Perfomance ลดลง , Code ซ้ำซ้อนมากเกินไป ,  มีโอกาสเกิด Bug สูง , ซับซ้อนเกินความจำเป็นทำให้ Transfer knowledge ยาก เป็นต้น

- ไม่ว่าจะเป็น Code ที่ดีหรือไม่ดี ควรมี Feedback กลับไป ไม่ควรจะเป็นการดุด่าว่ากล่าว หรือตัดสิน ควรจะแนะนำในทางที่ดีขึ้น และอธิบายด้วยเหตุผล หรือชมเชยแบบนี้จะดีกว่า

#### จุดประสงค์

- Developer ได้ตรวจสอบและทบทวน Code ที่ตัวเองเขียนอีกครั้ง ก่อนจะส่งงาน

- เกิดการแลกเปลี่ยน Knowledge ภายในทีม และสื่อสารกันมากขึ้น

- ลดความผิดพลาด

     
1. เมื่อเข้ามาหน้านี้แล้วกด *Add your review* 

![Start Review](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/start-review.png)

2. เราสามารถ Comment บรรทัดไหนก็ได้ กดรูป + ตรงหลังเลขบรรทัด จะ ​Comment ทีล่ะบรรทัดหรือลากคุมหลายบรรทัดก็ได้ 

![Comment Review](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/comment-review.png)

3. ถ้า Commit นี้ยังไม่ผ่าน ต้องกลับไปแก้ไข สามารถเลือก Request changes และให้ Developer `checkout` เข้ามาแก้ไขใน Branch เดิม แล้ว `push` มาใหม่ และทำการ Review อีกรอบ

![Request Change ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/request-change-review.png)

4. ถ้า Approved แล้วจะเห็นว่าสามารถ Merge pull request ได้

![Approve Review ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/approved-review.png)

5. หลังจาก Merge pull request แล้วอย่าลืมลบ Branch นั้นๆด้วย ไม่งั้นใน Repository นี้จะมี Branch นอกเหนือจาก `dev` , `master` มากขึ้นเรื่อยๆ  สามารถลบได้หลายวิธี หลังจาก Merge success สามารถกด ​Delete branch ได้เลย  หรือ ที่เดียวกับตอนสร้าง Branch ให้เลือก View all branches แล้วเลือกลบได้เลย
  
![Merged Success ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/merged-success.png)

![Delete Branch](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/delete-branch.png)


6. เมื่อกลับมาดูที่หน้าหลักหลังจาก Merge เนื้อหาใน README จะเปลี่ยนไปแล้ว

> ในการทำงานจะนับว่า Merge สำเร็จคือต้อง Test อีกรอบ

![Code After Merge ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/code-after-merge.png)


7. สามารถกลับมาดู Pull requests ทั้งหมดที่เคย Merge ไปแล้วได้ที่ "*Pull requests > Closed*" ในหน้านี้สามารถสร้าง Pull request และค้นหาหรือ Filter ต่างๆได้

![Lsit Pull Request](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/list-pull-closed.png)


### Resolve Conflict Code

> ส่วนนี้จะต่อจาก Code Review แต่เราแยกมาเป็นอีกหัวข้อ จะได้เห็นภาพมากขึ้น

ถ้าในระหว่างนั้นมีคนอื่น Push code ขึ้นแล้ว Merge ก่อน มีการแก้ไขไฟล์เดียวกัน บรรทัดเดียวกัน ทำให้ Code ชนกัน ไม่สามารถ Merge ได้ จะเป็นแบบนี้

![Conflict Code Review ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/conflict-code-review.png)

กรณีแบบนี้เกิดขึ้นไม่บ่อย แต่เกิดขึ้นได้ การแก้ไข มี 2 วิธี 
  
1. แก้ไขผ่าน Github UI โดยเลือกที่ Resolve conflicts (กรณี Code ชนกันไม่กี่จุด)
  
- มีการแบ่ง Code ออกเป็น 2 ส่วน แบ่งด้วย `<<<<<<<<` , `======` , `>>>>>>>>`
- ตั้งแต่ `<<<<<<<< feature/update-readme` ถึง `======` เป็น Code ของ Branch `feature/update-readme`
- ตั้งแต่ `======`  ถึง `>>>>>>>> dev` เป็น Code ของ Branch `dev`


![Resolve Code Review ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/resolve-code-review.png)

  การแก้ไข คือ ต้องเลือก Code อันใดอันหนึ่งหรือจะเอาทั้ง 2 ส่วนมารวมกันโดยเลือกแต่ล่ะบรรทัดเอาเลย อาจจะต้องมีการปรึกษากับ Developer อีกคนที่เขียน Code ส่วนนี้ที่ชนกับเรา แล้วลบสัญลักษ์ออกไปให้หมด ก็จะได้แบบนี้
![Mark Read Review ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/mark-read-review.png)

  เสร็จแล้ว กด Mark as resolved และ Commit merge

![Commit Merge Review ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/commit-merge-review.png)

  สามารถ Merge pull request ได้แล้ว

![After Resolve Review ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/after-resolve-review.png)


  
**2. แก้ไขในเครื่องแล้ว Push มาใหม่ (กรณี Code ชนกันเยอะ)** 

กลับไปที่ Branch `feature/update-readme` แล้วใช้คำสั่งนี้ 

```bash
git pull origin dev
```

คือการอัพเดต Code ล่าสุดของ `dev` ใน Branch `feature/update-readme` Editor ของเราก็จะเห็นชัดเจนเลยว่า Code ส่วนไหนบ้างที่ชนกันอยู่

![Conflict Local ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/conflict-local.png)

สีฟ้าคือ Code ที่เพิ่ง Pull มาหรือของ `dev` นั่นเอง เมื่อแก้ไขเสร็จแล้ว ให้ใช้คำสั่งตามนี้

> ถ้าทำงานจริงควร Test อีกรอบหลังแก้ไข

```bash
git add .
git commit -m "[#DEL001] Resolve code conflict"
git push origin feature/update-readme
```

เสร็จแล้วครับ กลับไป Review และ Merge pull request ได้เลย

### Release Version

หลังจากเรา Develop มาได้สักพักและถึงเวลาต้อง Depoly UAT, Production โดยเราจะ Release และ Tags ไว้เป็น Version วิธีการคือ
1. แตก Branch `release/v.1.0.0` ออกมาจาก `dev` และ `push` ไว้และนำไป Deploy ภายในเพื่อแยกให้ Tester ทำการ Test ทั้งหมดอีกรอบ และ Developer คนอื่นๆ จะได้ทำงานต่อบน `dev` ได้
> เลข Version ก็กำหนด Pattern เอาได้เลยตามข้อกำหนดของ Project

```bash
git checkout -b release/v.1.0.0
git push origin release/v.1.0.0
```

2. ระหว่าง Test ถ้าเจอ Bug หรือต้องแก้อะไร ก็แก้ที่ `release/v.1.0.0` และ Deploy ใหม่เพื่อ Test อีกรอบได้เลย
3. เมื่อ Test ผ่านแล้วให้สร้าง Pull request เลือก Merge เข้า `master` และ เข้า Process [Code Review](#code-review) ตามปกติเลย
> ถ้า `release/v.1.0.0` มีการแก้ไขอะไรเพิ่มต้องสร้าง Pull request เพื่อ Merge เข้า `dev` ด้วย

![Release Pull Request ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/release-pull-request.png)

4. หลังจาก Merge เข้า `master` ให้กลับมาที่เครื่องเรา แล้ว `checkout` ไป Branch `master` และเราจะทำการ Tags version นี้เอาไว้

> Tags คือ การ Pack version นี้เอาไว้บน Github ในรูปแบบ .zip .tar.gz เหมือนกับการช่วย Backup เอาไว้ 

```bash
#ดึงทุก Branch ลงมา
git fetch --all

#ย้ายไป branch master
git checkout master

#สร้าง tag ชื่อ v1.0.0 
git tag v1.0.0

#สร้าง tag บน Github Repository
git push --tags
```

หลังจาก `push` แล้วมาดูที่ Github
![Tags List](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/list-tags.png)
![Tags Detail ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/detail-tags.png)

5. ต่อไปเราจะสร้าง Release เพื่อใส่รายละเอียดต่างๆ และบอกว่า Version นี้ มี Changelog อะไรบ้าง จากรูปด้านบนจะเห็นว่ามี Tab Releases ข้างๆ Tags กดเข้าไป "**เลือก Create Release > เลือกว่าจะสร้างจาก Tags ไหน > กรอกรายละเอียดต่างๆ สามารถแนบไฟล์ได้ > กด Publish release**"


![Create Release ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/create-release.png)
![Release Detail ](https://raw.githubusercontent.com/Janescience/janescience/master/src/assets/documents/blogs/git-workflow/images/detail-release.png)

### Hotfix
เคสนี้จะใช้ตอนเกิด Bug ที่ Production เป็นการแตก Branch `hotfix/xxxx` ออกมาจาก `master` เพื่อแก้ไข เมื่อเสร็จแล้วก็จะเข้า Process [Pull Request](#pull-request) > [Code Review](#code-review) ตามปกติ แต่อย่าลืมว่า Version นี้ถูกใช้ไปแล้วบน Production เพราะฉะนั้น เราต้อง [Release Version](#release-version) อีกรอบ แต่เลข Version จะเป็นแบบนี้ `release/v1.0.1` เราจะไม่ Run เลขหน้าสุด เพราะว่ายังเป็น Version เดิม แต่มีการแก้ไขอะไรบางอย่างเล็กน้อย

# Conclusion
### ผลกระทบต่างๆที่เกิดขึ้นเมื่อใช้งานจริง
- ขั้นตอน Code Review ค่อนข้างจะเพิ่มงาน และรบกวนการทำงานพอสมควรเลย แต่ถ้าต้องแลกมาด้วย Code ที่มีประสิทธิภาพมากขึ้น Bug น้อยลง ผมก็ถือว่าคุ้มนะ เนื่องจากทีมของผมมี Reviewer 3 คนรวมตัวผม และต้องทำตั้งแต่ Review , Merge จนไปถึง Deploy และน้องๆ Developer ประมาณ 5-6 คน เลยต้องทำข้อตกลงว่าจะแบ่งรอบการ Review เป็น 3 รอบต่อวัน เช้า บ่าย และเย็น จัดเวรสำหรับ Reviewer คนล่ะ 2 วัน วนไปเรื่อยๆ ถ้าใครลาอีกคนก็ต้องทำแทน ลองคิดดูว่าถ้าในรอบนั้น มีประมาณ 3 Branch ที่ต้อง Review แล้วเกิด Conflict อีกหรือ Code ยังไม่ผ่าน มันเลยต้องใช้เวลาพอสมควรเลยครับ
- ส่งผลกระทบการทำงานไปยัง Tester เท่ากับว่าจะสามารถ Test ได้แค่ 3 รอบต่อวัน
- ต้องมีการทำข้อตกลงหลายๆอย่างกับ Developer ทุกคน เรื่อง การตั้งชื่อ Branch , การใส่ Commit message , การใส่รายละเอียดเวลาสร้าง Pull request , ตรวจ Code อีกรอบหลังสร้าง Pull request กว่าจะเป็นมาตรฐานเดียวกันจริงๆ ใช้เวลาพอสมควรเลยสำหรับช่วงที่ต้องเปลี่ยนแปลง
- ทำให้ไม่สามารถทำงานล่วงหน้าหรืองานอื่นๆที่ไม่เกี่ยวข้องกับ Version นี้ได้เลย (ถ้าจะทำต้องไม่เอาขึ้น Git) สมมุติมีแผนว่าเดือนนี้ เราจะเอา 10 Feature นี้ขึ้น Production ก็ควรจะทำแค่ 10 Feature นี้ให้เสร็จก่อนใน `dev` แล้วถึงจะทำงานอื่นๆได้ เพราะการที่มานั่ง Cut เอาตาม Commit จะยุ่งยากและเสี่ยงพอสมควร ถ้าแต่ล่ะ Commit ไม่ต่อกันตาม Sequence จริงๆ
> ข้อนี้อ่านแล้วอาจจะไม่ค่อนเข้าใจถ้ายังไม่ได้เป็นคนที่ต้อง Pack version นั้นๆเพื่อเอาไป Deploy
- งานอื่นๆที่ไม่ใช่ Feature/Issue แต่เป็นสิ่งที่ Developer แก้ไขอะไรเพิ่มเติมเข้าไปเอง จะต้องแจ้งให้กับคนอื่นๆทราบด้วย
- ต้องมีการทำเอกสารเพื่อบอกว่าการ Deploy dev ในแต่ล่ะครั้ง มี Feature/Issue อะไรบ้าง Branch ชื่ออะไรบ้าง ใครเป็นคน Deploy ใครเป็น Dev และสุดท้ายต้องบอกได้ว่าแต่ล่ะ Feature/Issue อยู่ Version อะไรใน Production ซึ่งเอกสารพวกนี้สำคัญมาก
  
### การเปลี่ยนแปลงที่ดีขึ้น
- Developer ทุกคนรอบครอบมากขึ้น เมื่อจะต้องมีคนอื่นมานั่งตรวจ Code เราทุกครั้ง และรู้สึกว่าไม่ใช่ Code ของคนใดคนหนึ่ง แต่มันคือ Code ของเราทุกคน
- Developer ทุกคนได้เรียนรู้และใช้ Git ได้อย่างมีประสิทธิภาพมากขึ้น
- มีการสรุปปัญหาและแชร์ความรู้ ทุก Week โดยอ้างอิงจาก Code ใน Pull request
- Senior หรือ Lead ได้เห็นการพัฒนา แลกเปลี่ยนความรู้ และให้คำแนะนำกับน้องๆ Developer อยู่เสมอ
- สามารถ Reverse version ได้ง่ายขึ้น เนื่องจากมีการ Tag ไว้ทุกๆ Version

สุดท้ายแล้ว ผมอยากจะบอกว่านี่เป็น Blog แรกของผมเลย ใช้เวลาในการเขียนค่อนข้างนานพอสมควร แก้แล้วแก้อีก หวังว่าจะเป็นประโยชน์ไม่มากก็น้อยครับ 😁 






