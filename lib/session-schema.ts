// Session attestation schema for anonymous session confirmations
export const SESSION_SCHEMA = {
  // Schema definition for session attestations
  schema: 'bool sessionCompleted,string sessionDate,bytes32 therapistID,bytes32 patientHash,uint256 sessionDuration,string sessionType,uint64 timestamp,string notes,bytes32 sessionHash',
  
  // Schema encoder for the session data (server-side only)
  getEncoder: () => {
    if (typeof window === 'undefined') {
      const { SchemaEncoder } = require('@ethereum-attestation-service/eas-sdk');
      return new SchemaEncoder(
        'bool sessionCompleted,string sessionDate,bytes32 therapistID,bytes32 patientHash,uint256 sessionDuration,string sessionType,uint64 timestamp,string notes,bytes32 sessionHash'
      );
    }
    return null;
  },
  
  // Helper function to encode session data
  encodeSessionData: (sessionData: {
    sessionCompleted: boolean;
    sessionDate: string;
    therapistID: string;
    patientHash: string;
    sessionDuration: number;
    sessionType: string;
    timestamp: number;
    notes: string;
    sessionHash: string;
  }) => {
    if (typeof window === 'undefined') {
      const { SchemaEncoder } = require('@ethereum-attestation-service/eas-sdk');
      const encoder = new SchemaEncoder(
        'bool sessionCompleted,string sessionDate,bytes32 therapistID,bytes32 patientHash,uint256 sessionDuration,string sessionType,uint64 timestamp,string notes,bytes32 sessionHash'
      );
      
      return encoder.encodeData([
        { name: 'sessionCompleted', value: sessionData.sessionCompleted, type: 'bool' },
        { name: 'sessionDate', value: sessionData.sessionDate, type: 'string' },
        { name: 'therapistID', value: sessionData.therapistID, type: 'bytes32' },
        { name: 'patientHash', value: sessionData.patientHash, type: 'bytes32' },
        { name: 'sessionDuration', value: sessionData.sessionDuration, type: 'uint256' },
        { name: 'sessionType', value: sessionData.sessionType, type: 'string' },
        { name: 'timestamp', value: sessionData.timestamp, type: 'uint64' },
        { name: 'notes', value: sessionData.notes, type: 'string' },
        { name: 'sessionHash', value: sessionData.sessionHash, type: 'bytes32' },
      ]);
    }
    return null;
  },
  
  // Helper function to hash patient information for anonymity
  hashPatientInfo: (patientInfo: string): string => {
    const { ethers } = require('ethers');
    return ethers.keccak256(ethers.toUtf8Bytes(patientInfo));
  },
  
  // Helper function to hash therapist information for anonymity
  hashTherapistInfo: (therapistInfo: string): string => {
    const { ethers } = require('ethers');
    return ethers.keccak256(ethers.toUtf8Bytes(therapistInfo));
  }
};
