//index.js
//获取应用实例
var app=getApp();
Page({
  data: {
    butonlist:[
      { link:"父亲",link1es:'a'},
      {  link: "母亲", link1es: 'b' }, 
      { link: "哥哥", link1es: 'c' },
       { link: "姐姐", link1es: 'd' },
      { link: "弟弟", link1es: 'e' },
      { link: "妹妹", link1es: 'f' },
      { link: "儿子", link1es: 'g' },
      { link: "女儿", link1es: 'h' }, 
      { link: "老公", link1es: 'j' },
      { link: "老婆", link1es: 'k' }, 
    ],
    find:[
                 {post:"曾+祖+父"},
      /* aab:*/  {post:"曾+祖+母"} ,
      /* aba: */ {post:"曾+外祖+父"} ,
     /* abb: */ {post:"曾+外祖+母"} ,
      /* baa:*/  {post:"外曾+祖+父" },
      /* bab: */ {post:"外曾+祖+母"} ,
      /* bba: */ {post:"外曾+外祖+父"} ,
       /*bbb: */ {post:"外曾+外祖+母" },
  ],
  find2:[
    {post:"曾+孙+儿"},
    { post: "曾+孙+女" },
    { post: "曾+外孙+儿" },
    { post: "曾+外孙+女" },
    { post: "外曾+孙+儿" },
    { post: "外曾+孙+女" },
    { post: "外曾+外孙+儿" },
    { post: "外曾+外孙+女" },
  ],


    lj: 0,         //完整的符号代表             用 逗号隔开
    name:0,       //输出
    last:0,

    sum:0,      
    mother:0,
    son:0,

    ljextra:0 ,   //判断最后几个元素字符串     用 逗号隔开
    ljarrextra: 0,//判断辈分和关系的辅助字符串   用 逗号隔开
    select:0    //判断有没有多个输出
  },

  //增加元素和符号代表
changeName: function (e) {
    var hhh=this.data.name;
    var lnk=this.data.lj;   //逻辑链
    console.log(hhh);
    console.log(lnk);
    if(hhh==0)
     { this.setData({
        name:e.currentTarget.dataset.hi,
      lj: lnk + ',' + e.currentTarget.dataset.lj
      })
      }
    else{
    this.setData({
      name:  hhh+ "的" + e.currentTarget.dataset.hi,
      lj: lnk + ',' + e.currentTarget.dataset.lj
    })
    }
},


//删除元素和
deteli:function(e){
    var hhh = this.data.name;
    var hhh = hhh.split("的");
    var ljarr=this.data.lj;
    var ljarr = ljarr.split(",");
    hhh.splice(-1,1);
    ljarr.splice(-1,1);
    if(hhh.length!=0)
   { 
    hhh=hhh.join('的');
    ljarr = ljarr.join(',');
    }
  this.setData({
     name: hhh,
     lj: ljarr
    })
  },


  //清除所有东西
clearname:function(e){
    this.setData({
      name:0,
      lj:0,
      sum: 0,
      mother: 0,
      son: 0,
      last:0
    })
  },




  //求结果
equal:function(){
  this.sumarr();
  var sum=this.data.sum;
  if(sum>=3)
    {            //找到大概有几代人（几乎没有用）
    this.final();             //找出最后的几个元素
    this.sumextra();         //找出具体辈分链，即ljarrextra
    var lj = this.data.ljarrextra;    //lj只有a,b
     let name=this.line(lj);      //决定具体叫什么
    

    var ljextra=this.data.ljextra;      //最后的几个元素不含有gh,最后一个是有可能为a，b,cdef,jk

    var select = this.data.select;
   var sexsign=0;
   var sex=0;
   


   if ((ljextra != '0'))                //提取有用的元素
    {var ljextra = ljextra.split(',');}

    var lj = lj.split(',');
    var ljlast=lj.splice(-1,1);


   if ((ljextra != '0')){
   while(1)
{ 
      var temp = ljextra.splice(0,1);
     if ((temp == 'j') || (temp == 'k'))
    { sexsign=1;}
     else
      break;
}  
 } 
 var nameq=name.split('+');
console.log(nameq);
    if ((temp == 'b') || (temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j'))
  sex=1;
  else
  sex=-1;
  if(sexsign==1)
  sex=-1*sex;
      if ((sex == 1) )
  nameq.splice(-1,1,"母");
      else if ((sex == -1) )
    nameq.splice(-1, 1, "父");


 var long=0;
  var cmp1 ="曾";
  var cmp2 ="外曾";
  for(var i=0;i<nameq.length;i++)
{
    long=0;
    if(nameq[i]==cmp2)
{
  var k=i+1;
  while(nameq[k]==cmp1)
  {
    k++;
    long++;
  }
   if (long != 0)
{ var tmp = this.decideb(long);
      var tmp='外'+tmp;
nameq.splice(i,long+1,tmp);
}

}
    if (nameq[i] == cmp1)
    {
      var k = i + 1;
      while (nameq[k] == cmp1) {
        k++;
        long++;
      }
      if(long!=0)
     { var tmp = this.decideb(long);
      nameq.splice(i,long+1,tmp);}
    }
  }

  var nameq=nameq.join('+');
var family;
    if ((temp == 'a')|| (temp == 'b'))
    family=temp;
    else 
    family=ljlast+temp;

console.log(family);

if(select!=1)
   { if (family == 'ac')
      nameq = '伯' + nameq;
    if (family == 'ae')
      nameq = '叔' + nameq;}
    if ((family == 'ad') || (family == 'af'))
      nameq = '姑' + nameq;
    if (((family == 'ae')|| (family == 'ac'))&&select==1)
      nameq = '伯' + nameq + '/' + nameq + '/' + '叔' + nameq;
    if ((family == 'bc')|| (family == 'be'))
     nameq='舅'+nameq;
    if ((family == 'bd') || (family == 'bf'))
      nameq = '姨' + nameq;

    let beifen=this.decideb();    //决定辈fen,meiyouyong
  
   var mother =this.data.mother;
   var son=this.data.son;
   if(son!=0)
   {
     if(mother==0)
     nameq='堂'+nameq;
     else
     nameq= '表'+nameq;
   }
console.log(nameq);}
else if(sum>-3)
{
  if(sum>0)
  {
    var nameq=this.sum0();
    console.log(nameq);
  }

  else if(sum==0)
  {
    var nameq=this.sum2();
  }
  else
  {
    var nameq=this.sum1();
  }
}
else{
    this.sumextra();          //找出具体辈分链，即ljarrextra
    var lj = this.data.ljarrextra;    //lj只有a,b
    let name = this.line(lj);      //决定具体叫什么
    console.log(name);
    var nameq = name.split('+');
    var temp=this.zuihou();
    var temp = temp.toString();
    var tamp=this.first();



    if ((temp == 'b') || (temp == 'd') || (temp == 'f') || (temp == 'h')  )
      sex = 1;
    else if ((temp == 'a') || (temp == 'c') || (temp == 'e') || (temp == 'g'))
      sex = -1;
      console.log(sex);
    if (sex == 1)
     nameq.splice(-1, 1, "女");
    else
      nameq.splice(-1, 1, "儿");
    if (temp == 'k')
      nameq.splice(-1,1,"儿媳妇");
    if (temp == 'j')
      nameq.splice(-1, 1, "女婿");

    if ((tamp == 'd') || (tamp == 'f') || (tamp == 'b'))
      nameq.splice(-2, 1, "外甥孙");
    if ((tamp == 'c') || (tamp == 'e') || (tamp == 'a'))
      nameq.splice(-2, 1, "侄孙");
 
    
    var long = 0;
    var cmp1 = "曾";
    var cmp2 = "外曾";
    for (var i = 0; i < nameq.length; i++) {
      long = 0;
      if (nameq[i] == cmp2) {
        var k = i + 1;
        while (nameq[k] == cmp1) {
          k++;
          long++;
        }
        if (long != 0) {
          var tmp = this.decidea(long);
          var tmp = '外' + tmp;
          nameq.splice(i, long + 1, tmp);
        }

      }
      if (nameq[i] == cmp1) {
        var k = i + 1;
        while (nameq[k] == cmp1) {
          k++;
          long++;
        }
        if (long != 0) {
          var tmp = this.decidea(long);
          nameq.splice(i, long + 1, tmp);
        }
      }
    }
    var nameq=nameq.join('+');



    
    var q=this.tang();
    if(q==1)
    nameq="堂"+nameq;
    if(q==2)
    nameq="表"+nameq;



}




var na=nameq.split("+");
var nameq=na.join("");
var namea=this.data.name;
this.setData({
  last:namea,
  name:nameq
})
},
  
  sum1:function(){
    this.sumextra();          //找出具体辈分链，即ljarrextra
    var lj = this.data.ljarrextra;    //lj只有a,b
    var temp = this.zuihou();
    var temp = temp.toString();
    var tamp = this.first();
    var hh=lj.split(',')
    var hhh=hh.join('');
    var name=0;
    var sum=this.data.sum;
    switch(hhh)
    {
      case 'g':name='儿+子';break;
      case 'h': name = '女+儿'; break;
      case 'gg': name = '孙+子'; break;
      case 'gh': name = '孙+女'; break;
      case 'hg': name = '外+孙+子'; break;
      case 'hh': name = '外+孙+女'; break;
    }
      var name=name.split('+');
if((hhh =='g')||(hhh=='h'))
   { if ((tamp == 'd') || (tamp == 'f') || (tamp == 'b'))
      name.splice(-2, 1, "外甥");
    if ((tamp == 'c') || (tamp == 'e') || (tamp == 'a'))
      name.splice(-2, 1, "侄");
   }
    if ((hhh == 'gg') || (hhh == 'hg') || (hhh == 'hh') || (hhh == 'gh'))
    {
      if ((tamp == 'd') || (tamp == 'f') || (tamp == 'b'))
        name.splice(-2, 1, "外甥孙");
      if ((tamp == 'c') || (tamp == 'e') || (tamp == 'a'))
        name.splice(-2, 1, "侄孙");
        }
    var sex=0;
  
    console.log(name);

    if ((temp == 'b') || (temp == 'd') || (temp == 'f') || (temp == 'h'))
      sex = 1;
    else if ((temp == 'a') || (temp == 'c') || (temp == 'e') || (temp == 'g'))
      sex = -1;
   
   
    if ((sum == 2) || (tamp == 'c') || (tamp == 'd') || (tamp == 'e') || (tamp == 'f')){
    if ((sex == 1) && ((temp == 'b') || (temp == 'f') || (temp == 'h') || (temp == 'd')))
      name.splice(-1, 1, "女");
    else if ((sex == -1) && ((temp == 'a') || (temp == 'c')  || (temp == 'e') || (temp == 'g')))
      name.splice(-1, 1, "儿");
      if (temp == 'k')
        name.splice(-1, 1, "媳妇");
      if (temp == 'j')
        name.splice(-1, 1, "女婿");
      }

    if ((tamp != 'c') && (tamp != 'd')&& (tamp != 'e') && (tamp != 'f'))
    {  
      if(sum==-1){
        if (sex == 1)
        var name= '女+儿';
        else if(sex==-1)
        var name= '儿+子';
        if (temp == 'k')
          var name = "儿媳+妇";
        if (temp == 'j')
          var name ='女+婿';
        var name = name.split('+');
        
      }
    }



 
console.log(name);
    var nameq = name.join('+');
    var q = this.tang();
    if (q == 1)
      nameq = "堂" + nameq;
    if (q == 2)
      nameq = "表" + nameq;

  return nameq;
  },



  sum0: function () {
    this.final();             //找出最后的几个元素
    this.sumextra();         //找出具体辈分链，即ljarrextra
    var lj = this.data.ljarrextra;    //lj只有a,b
    var ljextra = this.data.ljextra;      //最后的几个元素不含有gh,最后一个是有可能为a，b,cdef,jk
    var sum=this.data.sum;
    var select = this.data.select;
    var sexsign = 0;
    var sex = 0;
    var name='自己';

    if ((ljextra != '0'))                //提取有用的元素
    { var ljextra = ljextra.split(','); }

    var lj = lj.split(',');
    var ljlast = lj.splice(-1, 1);
    var ljfirst=lj.splice(0,1);
    

    if ((ljextra != '0')) {
      while (1) {
        var temp = ljextra.splice(0, 1);
        if ((temp == 'j') || (temp == 'k'))
         { sexsign = 1; }
        else
          break;
      }
    } 

    var family;
    if ((temp == 'a') || (temp == 'b'))
      family = temp;
    else
      family = ljlast + temp;
  
      console.log(family);
    console.log(temp + ljlast);
    

    if ((select != 1)&&sum==1) {
      if (family == 'ac')
          name ='伯+伯';
      if (family == 'ae')
        name ='叔+叔';
    }
    console.log(name);
    console.log(sum);
    if(sum==1){
    if ((family == 'ad') || (family == 'af'))
      name = '姑+姑' ;
    if (((family == 'ae') || (family == 'ac')) && select == 1)
      name = '伯+伯'  + '/' + '爸爸' + '/' + '叔+叔' ;
    if ((family == 'bc') || (family == 'be'))
      name = '舅+舅' ;
    if ((family == 'bd') || (family == 'bf'))
      name = '姨+妈';
      if(family=='a')
      name='爸+爸';
      if (family == 'b')
      name = '妈+妈'
    console.log(name);
     var name=name.split("+");
      (temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j')
      if (((temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j'))&&( family != 'a') && (family != 'b'))
      sex = 1;
    else
      sex = -1;
    if (sexsign == 1)
      sex = -1 * sex;
      if ((sex == 1) && ((temp == 'c') || (temp == 'e')))
      name.splice(-1, 1, "母");
      else if ((sex == -1) && ((temp == 'd') || (temp == 'f')))
      name.splice(-1, 1, "父");
       var name=name.join('+');
    if ((family == 'a') && (sexsign == 1))
      var name = '妈+妈';
    if ((family == 'b') && (sexsign == 1))
       var name = '爸+爸';
    }

      if(sum==2)
      {
        var hhh = ljfirst+ljlast;
        if(hhh=='aa'){
          name='祖+父';
        if (select != 1) {
          if (family == 'ac')
            name = '伯' + name;
          if (family == 'ae')
            name = '叔' + name;
        }
    
        if ((family == 'ad') || (family == 'af'))
          name = '姑+奶奶' ;
        if (((family == 'ae') || (family == 'ac')) && select == 1)
          name = '伯' + name + '/' + '爷+爷' + '/' + '叔' + name;
          if (family == 'a')
            name = '爷+爷';
            
          var name = name.split("+");
          console.log(select); console.log(77);
          if (select != 1)
          {
            if (((temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j')) && (family != 'a'))
            sex = 1;
          else
            sex = -1;
          if (sexsign == 1)
            sex = (-1) * sex;
            console.log(sex);
            console.log(77);
            if ((sex == 1) && ((temp == 'e') || (temp == 'c')))
            name.splice(-1, 1, "母");
            else if ((sex == -1) && ((temp == 'd') || (temp == 'f')))
            name.splice(-1, 1, "爷爷");
        
            }

            var name=name.join('+');

          if (((family == 'ae') || (family == 'ac')) && (select == 1) && sexsign == 1)
          name='奶+奶'+'/'+'堂+祖母'
          if ((family == 'a') && sexsign == 1)
            name = '奶+奶';

      }
        if (hhh == 'ab'){
          if ((family == 'bc') || (family == 'be'))
            name = '舅+公' ;
          if ((family == 'bd') || (family == 'bf'))
            name = '姨+奶奶' ;
          if (family == 'b')
            name = '奶+奶';
           var name = name.split('+');
          if (((temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j')) && (family != 'b'))
              sex = 1;
            else
              sex = -1;
            if (sexsign == 1)
              sex = (-1) * sex;
              console.log(sex);
              console.log(temp);
          console.log(88);
          if ((sex == 1) && ((temp == 'c') || (temp == 'e')))
              name.splice(-1, 1, "母");
          else if ((sex == -1) && ((temp == 'd') || (temp == 'f')))
              name.splice(-1, 1, "爷爷");
             var name = name.join('+');
          if ((family == 'a') && sexsign == 1)
            name = '爷+爷';
      
        }
      if(hhh=='ba'){
        name = '外祖+父';
        if (select != 1) {
          if (family == 'ac')
            name = '伯' + name;
          if (family == 'ae')
            name = '叔' + name;
        }
        if ((family == 'ad') || (family == 'af'))
          name = '姑姥+姥';
        if (((family == 'ae') || (family == 'ac')) && select == 1)
          name = '伯' + name + '/' + '外+公' + '/' + '叔' + name;
        if (family == 'a')
          name = '外+公'; 
          var name = name.split("+");
        if (select != 1) {
          if (((temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j')) && (family != 'a'))
            sex = 1;
          else
            sex = -1;
          if (sexsign == 1)
            sex = -1 * sex;
          if ((sex == 1)&& ((temp == 'c') || (temp == 'e')))
            name.splice(-1, 1, "母");
          else if ((sex == -1)&& ((temp == 'd') || (temp == 'f')))
            name.splice(-1, 1, "爷");
         var name= name.join('+');
        }
    if (((family == 'ae') || (family == 'ac')) && (select == 1) && sexsign == 1)
      name = '伯外祖+母' + '/' + '叔外祖+母' + '/' + '外+婆'
        if ((family == 'a') && sexsign == 1)
          name = '外+婆';

          
      }
        if (hhh == 'bb') {
          if ((family == 'bc') || (family == 'be'))
            name = '外舅+公';
          if ((family == 'bd') || (family == 'bf'))
            name = '姨姥+姥';
          if (family == 'b')
            name = '外+婆';
           var name=name.split('+');
          if (((temp == 'd') || (temp == 'f') || (temp == 'h') || (temp == 'j')) && (family != 'b'))
            sex = 1;
          else
            sex = -1;
          if (sexsign == 1)
            sex = -1 * sex;
        if ((sex == 1)&& ((temp == 'c') || (temp == 'e')))
            name.splice(-1, 1, "母");
        else if ((sex == -1)&& ((temp == 'd') || (temp == 'f')))
            name.splice(-1, 1, "爷");
          var name=name.join('+');
          if ((family == 'a') && sexsign == 1)
            name = '外+公';
        }
        var mother = this.data.mother;
        var son = this.data.son;
        if ((son != 0) && ((select != 1)|| (sexsign != 1)) ){
          if (mother == 0)
            var name = '堂' + name;
          else
            var name = '表' + name;
        }
       
      }
    return name;


  },
sum2:function()
{
  this.sumarr();
  this.final();             //找出最后的几个元素
  var ljextra = this.data.ljextra;      //最后的几个元素不含有gh,最后一个是有可能为a，b,cdef,jk if ((ljextra != '0'))                //提取有用的元素
   var ljextra = ljextra.split(',');
   var name='自己';
  var sexsign=0;
  console.log(ljextra);
  console.log(name);
  var n=0;
  if ((ljextra != '0')) {
    while (1) {
      var temp = ljextra.splice(0, 1);
     
      if (temp == 'j') 
       { if (n == 0)
        sexsign = 1;
        n++; 
       }
      else if(temp=='k')
      {
        if (n == 0)
          sexsign = 2;
          n++;
      }
     
    
      else if(temp==0)
        break;
      else 
      break;
    }
  } 
console.log(sexsign);
  console.log(temp);
    if ((temp == 'c')&& ((sexsign == 1) || (sexsign == 0)))
  name='哥+哥';
    if ((temp == 'd')&& ((sexsign == 2) || (sexsign == 0)))
    name = '姐+姐';
    if ((temp == 'e')&& ((sexsign == 1) || (sexsign == 0)))
    name = '弟+弟';
  if ((temp == 'f') && ((sexsign == 2) || (sexsign == 0)))
    name = '妹+妹';

  if ((temp == 'c') &&( sexsign== 2))
    name = '嫂+子';
    if ((temp == 'd')&& (sexsign ==1))
    name = '姐+夫';
    if ((temp == 'e')&& (sexsign == 2))
    name = '弟+妹';
if ((temp == 'f')&& (sexsign == 1))
    name = '妹+夫';
  if ((temp == 0) && sexsign == 1)
  name = "老+公";
  if ((temp == 0) && sexsign == 2)
    name = "老+婆";

  var mother = this.data.mother;
  var son = this.data.son;

  if ((son != 0)&&(temp!=0)) {
    if (mother == 0)
      name = '堂' + name;
    else
      name = '表' + name;
  }
return name;
 
},

tang:function()
{
  var arr =this.data.lj;
  var arr1=arr.split(',');

  var sum=0;
  var select=0;
  for(var index =0;index<arr.length;index++)
  {
    if( (arr1[index] == 'a')|| (arr1[index] == 'b'))
    sum++;
    if ((arr1[index] == 'g') || (arr1[index] == 'h'))
    sum--;
    if(sum>0)
    {
        var k=index+1;
      if ((arr1[index] == 'a') && (arr1[k] != 'g') && (arr1[k] != 'h'))
      {
        if ((arr1[k] % 2 == 1) || (arr1[k]=='b'))
          select=1;
        else
          select=2;
      }

      if ((arr1[index] == 'b') && (arr1[k] != 'g')&& (arr1[k] != 'h'))
      select=2;
    }

  }
return select;
},


first:function()
{
  var arr = this.data.lj;
  var arr1 = arr.split(",");
  var tamp = arr1.splice(1, 1);
  return tamp;
},

zuihou:function()
{
  var arr = this.data.lj;
  var arr1 = arr.split(",");
  var tamp=arr1.splice(-1,1);
  return tamp;
},

  //寻找关系
  sumextra:function (){
    var hhh=this.data.lj;
     var arrextra=hhh.split(",")
    var arr = new Array();
    for ( var index in arrextra)
  {
      if ((arrextra[index] == "a") || (arrextra[index] == "b")||(arrextra[index] == "g") || (arrextra[index] == "h"))
        arr.push(arrextra[index]);
  }
var x=arr.length;
var n=0;
var sum=this.data.sum;
if(sum>0)
{ for(var i=0;i<x;i++)
 {
   n++;
   if ((arr[i] == 'h') || (arr[i] == 'g'))
   {
     var k=i-1;
    arr.splice(i,1);
     console.log(arr);
     console.log(k);
     i=i-2;
    arr.splice(k,1);
    console.log(arr);
   }
 }}
 else
 {
  for (var i = 0; i < x; i++) {
    n++;
    if ((arr[i] == 'a') || (arr[i] == 'b')) {
      var k = i - 1;
      arr.splice(i, 1);
      console.log(arr);
      console.log(k);
      i = i - 2;
      arr.splice(k, 1);
      console.log(arr);
    }
  }
 }

    hhh=arr.join(",");
 
    console.log(n);
    this.setData({
      ljarrextra: hhh,
    })
  },

//找到核心字符


line:function(lj){
  console.log(99);
    var arr=lj;
    var arr=arr.split(',');
    arr.join(",");   
    var that=this;
    var sum=that.data.sum;
    if(arr.length==3)
    { 
       var hhh=arr.join('');
       if(sum>=3){
      switch(hhh)
      {
        case 'aaa': var x = 0; break;
        case 'aab': var x = 1; break;
        case 'aba': var x = 2; break;
        case 'abb': var x = 3; break;
        case 'baa': var x = 4; break;
        case 'bab': var x = 5; break;
        case 'bba': var x = 6; break;
        case 'bbb': var x = 7; break;
      }
      var find=that.data.find;
      return find[x].post;
      }
      else{
         switch (hhh) {
           case 'ggg': var x = 0; break;
           case 'ggh': var x = 1; break;
           case 'ghg': var x = 2; break;
           case 'ghh': var x = 3; break;
           case 'hgg': var x = 4; break;
           case 'hgh': var x = 5; break;
           case 'hhg': var x = 6; break;
           case 'hhh': var x = 7; break;
         }
         var find = that.data.find2;
         return find[x].post;
      }
    }
    else{
      var arr1 = lj;
      var arr2 = lj;
      var arr1 = arr1.split(',');
      var arr2 = arr2.split(',');
      arr1.pop();
      arr2.shift();
      var arr1= arr1.join(',');
      var arr2 = arr2.join(',');
      var x1=that.line(arr1);
      var x2 =that.line(arr2);
      x1=x1.split('+');
      x1=x1.splice(0,1);
      var x=x1+'+'+x2;
      return x;
    }
  },
    

  decideb:function(tmp){
    var x='0';
    switch(tmp)
    {
      case 1: x ="高";break;
      case 2: x = "天"; break;
      case 3: x = "列"; break;
      case 4: x = "太"; break;
      case 5: x = "远"; break;
      case 6: x = "鼻"; break;
    }
    return x;
  },
  decidea: function (tmp) {
    var x = '0';
    switch (tmp) {
      case 1: x = "玄"; break; 
      case 2: x = "来"; break;
      case 3: x = "晜"; break;
      case 4: x = "仍"; break;
      case 5: x = "云"; break;
      case 6: x = "耳"; break;
    }
    return x;
  },

  //sum>3
final:function(){
   var ljarr = this.data.lj;
   var ljarr=ljarr.split(',');

   var arr = new Array();       //储存最后几个元素
   var i=1;
  var select=0;      //判断最后几个元素有没有兄弟
   arr[0] = ljarr.splice(-1, 1);
   if((arr[0]=='j')||(arr[0]=='k'))
   {
     while(i)
     {var a= ljarr.splice(-1, 1);
      if( (a == 'g')|| (a == 'h'))
       continue;
     if((a!='j')||(a!='k'))
      {arr.push(a);
      break;}
     }
   }

   if ((arr[0] != 'a') && (arr[0] != 'b'))
   {while(i)
   {             //初步找出最后几个元素
     var queue=ljarr.splice(-1,1)
     if ((queue == 'a') || (queue == 'b'))
      {arr.push(queue);
      break;
      }
     if ((queue == 'g') || (queue == 'h'))
       continue;
      arr.push(queue);
      if(queue==0)
      break;
   }


   for( var index in arr)//确定有没有兄弟
   
      {
     if ((arr[0] == 'c')|| (arr[0] == 'd'))
        {
       if ((arr[index] == 'e') || (arr[index] == 'f'))
        select = 1;
        }
     if ((arr[0] == 'e') || (arr[0] == 'f')) {
       if ((arr[index] == 'c') || (arr[index] == 'd'))
         select = 1;
     } 
      }
   }
   
    var hhh= arr.join(',');
    console.log(111);
    console.log(hhh);
     console.log(111);
    this.setData({
      ljextra:hhh,
      select:select   //判断是否多个结果

    })
   

 },


//几乎没有用
 //统计输入的辈分和关系（外，表，堂）
 sumarr:function(){
    var ljarr=this.data.lj;
    var ljarr = ljarr.split(",");
    var mother=0;
    var sum=0;
    var son=0;
    for (var index in ljarr)
    {
      if(ljarr[index]=='b')
      {
        mother++;
        sum++;
      }
      if (ljarr[index]=='a')
      sum++;
      if ((ljarr[index] == 'g') || (ljarr[index] == 'h'))
      {sum--;
      for(var i=index;i>=0;i--)
       { if ((ljarr[i] == 'a')|| (ljarr[i] == 'b'))
        son++;
        if ((ljarr[i] == 'g') || (ljarr[i] == 'h'))
        break;
        }
      }
    }
    console.log(sum);
    this.setData({
      sum:sum,
      son:son,
      mother:mother
    })

  }
})