//
//  IdNativeAppIntegrationLayer.swift
//  AppWithNail
//
//  Created by Blended Learning Center on 15.03.18.
//

import Foundation

class IdNativeAppIntegrationLayer {
    
    private var serviceNames = [String]()
    private var endpointUrl  = [String]()
    private var displayNames = [String]()
    private var serviceUrl = [String]()
    private var serviceToken = [String]()
    
    // nested variable
    // single service could have several apis, single api represented as ApiContainer here
    private var apis = [[ApiContainer]]()
    private var authorization = [AuthorizationContainer]()
    
    
    private var responseData : Any?
    
    init(inputData: Data){
        
        
        //inputData : Data
        do{
            let json = try JSONSerialization.jsonObject(with: inputData, options: [])
            responseData = json
            for service in json as! [Any] {
                let jsonEntry = service as! [String : Any]
                parseEntry(jsonDict: jsonEntry)
            }
            
        } catch {
            print("Error on parsing json data in NAIL API")
            return
        }
    }
    
    init ( serializedStr : String ){
        parse(serialization: serializedStr)
    }
    
    func parse(serialization : String ) {
        guard let data = serialization.data(using: .utf8, allowLossyConversion: false) else {
            return
        }
        do{
            let json = try JSONSerialization.jsonObject(with: data, options: [])
            responseData = json
            for service in json as! [Any] {
                let jsonEntry = service as! [String : Any]
                parseEntry(jsonDict: jsonEntry)
                return
            }
        } catch {
            print("Error on parsing the serialized Data")
            return
        }
    }
    
    
    func parseEntry(jsonDict : [String: Any]){
        
        guard let name = jsonDict["engineName"] as? String else{ return; }
        guard let endpoint = jsonDict["engineLink"] as? String else{ return; }
        guard let homePageLink = jsonDict["homePageLink"] as? String else{ return; }
        guard let apisJson = jsonDict["apis"] as? [String: Any] else{ return; }
        guard let authDictTmp = jsonDict ["authorization"] as? [String : Any] else{ return; }
        serviceNames.append(name)
        endpointUrl.append(endpoint)
        serviceUrl.append(homePageLink)
        var api = [ApiContainer]()
        for apiName in apisJson.keys{
            let apiTmp = ApiContainer(name: apiName, authData: apisJson[apiName] as! [String : Any] )
            api.append(apiTmp)
        }
        apis.append(api)
        authorization.append( AuthorizationContainer(authDict: authDictTmp) )
        
    }
    
    func serialize() -> String {
        if responseData == nil {
            print("no response data found for serialize!")
            return ""
        }
        
        do {
            let data = try JSONSerialization.data(withJSONObject: responseData!, options: .prettyPrinted)
            let convertedString = String(data: data, encoding: .utf8)
            return convertedString!
        }catch {
            print("Serialize : error on serializing json object")
            return ""
        }
        
    }
    
    func getServiceNames() -> [String] {
        return serviceNames
    }
    
    func getAccessToken (serviceName : String, protocolName : String) -> String {
        
        guard let index = serviceNames.index(of: serviceName) else {
            return ""
        }
        let authCon = authorization[index]
        var protocolFound : Bool = false
        for api in apis[index] {
            if  protocolName == api.getName() {
                protocolFound = true
                break
            }
        }
        if !protocolFound {
            return ""
        }
        
        return authCon.getAccessToken()
    }
    
    func getDisplayName (serviceName: String) -> String {
        
        if serviceNames.contains(serviceName) {
            return serviceName
        } else {
            return ""
        }
    }
    
    func getEndpointUrl ( serviceName : String, protocolName: String) -> String {
        
        guard let index = serviceNames.index(of: serviceName) else {
            return ""
        }
        let apiContainers = apis[index]
        let homeLink = serviceUrl[index]
        
        var res = homeLink
        for api in apiContainers {
            if api.getName() == protocolName{
                guard let apiLink = api.getApiLink() else {
                    continue
                }
                res += apiLink
                break
            }
        }
        return res
    }
    
    func getServiceUrl (serviceName: String) -> String {
        guard let index = serviceNames.index(of: serviceName) else {
            return ""
        }
        let result = serviceUrl[index]
        
        return result
    }
    
    func removeService(serviceName : String){
        guard let index = serviceNames.index(of: serviceName) else {
            print("Error on removing service : Cannot find the service name")
            return
        }
        serviceNames.remove(at: index)
        endpointUrl.remove(at: index)
//        displayNames.remove(at: index)
        serviceUrl.remove(at: index)
        //serviceToken.remove(at: index)
        apis.remove(at: index)
        authorization.remove(at: index)
    }
    
    func clearAllService(){
        
        serviceNames.removeAll()
        endpointUrl.removeAll()
        serviceUrl.removeAll()
        apis.removeAll()
        authorization.removeAll()
        responseData = nil
    }
    
    
}
