/**
 * Navigate to a URI by triggering the popstate event in order for the router to deal with
 * a change of browser history.
 * NB : this solution is to avoid circular depedencies : if Navigate() had to import, directly or
 * indirectly, the pages, then there would be a circular reference because the router
 * has to import all the pages to render them.
 */

const Navigate = (toUri,id) => {
  if(id !== undefined){
    console.log("le id est : ",id);
    // eslint-disable-next-line no-param-reassign
    toUri +=id
  }
  const fromUri = window.location.pathname;
  if (fromUri === toUri) return;

  window.history.pushState({}, '', toUri);
  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
};

export default Navigate;
