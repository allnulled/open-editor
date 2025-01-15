(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['GlobalUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['GlobalUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const GlobalUtils = {};

  GlobalUtils.humanize = function(text) {
    let out = text;
    out = out.replace(/_|-/g, " ");
    out = out.substr(0,1).toUpperCase() + out.substr(1);
    return out;
  };

  GlobalUtils.humanizeDatestring = function(datestring, uppercase = true) {
    const [ year, month, date ] = datestring.split("/").map(n => parseInt(n));
    const vdate = new Date();
    vdate.setFullYear(year);
    vdate.setMonth(month-1);
    vdate.setDate(date);
    let weekdate = (() => {
      const weekday = vdate.getDay();
      if(weekday === 0) {
        return "Domingo";
      } else if(weekday === 1) {
        return "Lunes";
      } else if(weekday === 2) {
        return "Martes";
      } else if(weekday === 3) {
        return "Miércoles";
      } else if(weekday === 4) {
        return "Jueves";
      } else if(weekday === 5) {
        return "Viernes";
      } else if(weekday === 6) {
        return "Sábado";
      }
    })();
    if(!uppercase) {
      weekdate = weekdate.toLowerCase();
    }
    let human_month = (() => {
      const m = vdate.getMonth();
      if(m === 0) {
        return "enero";
      } else if(m === 1) {
        return "febrero";
      } else if(m === 2) {
        return "marzo";
      } else if(m === 3) {
        return "abril";
      } else if(m === 4) {
        return "mayo";
      } else if(m === 5) {
        return "junio";
      } else if(m === 6) {
        return "julio";
      } else if(m === 7) {
        return "agosto";
      } else if(m === 8) {
        return "setiembre";
      } else if(m === 9) {
        return "octubre";
      } else if(m === 10) {
        return "noviembre";
      } else if(m === 11) {
        return "diciembre";
      }
    })();
    return `${ weekdate },  ${ date } de ${ human_month } del ${ year }`;
  }
  
  return GlobalUtils;

});